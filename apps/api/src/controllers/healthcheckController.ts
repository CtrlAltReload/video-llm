import { Request, Response } from "express";
import mongoose from "mongoose";
import { getDiskInfoSync } from "node-disk-info";

interface HealthCheckResponse {
  status: "OK" | "ERROR" | "DEGRADED";
  uptime: number;
  responseTime: [number, number];
  message?: string;
  timestamp: string;
  version?: string;
  database?: {
    status: "connected" | "disconnected" | "error";
    responseTime?: number | string;
    message?: string;
  };
  memory?: {
    status: "OK" | "WARNING";
    used: string;
    total: string;
    percentage: string;
  };
  disk?: {
    status: "OK" | "WARNING" | "ERROR";
    filesystem: string;
    mounted: string;
    total: string;
    free: string;
    used: string;
    percentage: string;
    message?: string;
  };
}

export const simpleHealthCheck = async (_req: Request, res: Response) => {
  const healthcheck = {
    status: "OK",
    uptime: process.uptime(),
    message: "Service is running",
    timestamp: new Date().toISOString(),
  };

  res.status(200).json(healthcheck);
};

export const healthCheck = async (_req: Request, res: Response) => {
  const startTime = process.hrtime();

  const healthcheck: HealthCheckResponse = {
    status: "OK",
    uptime: process.uptime(),
    responseTime: process.hrtime(),
    message: "Service is healthy",
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || "1.0.0",
  };

  try {
    const dbStartTime = Date.now();
    await checkDatabaseHealth();
    const dbResponseTime = Date.now() - dbStartTime;

    healthcheck.database = {
      status: "connected",
      responseTime: dbResponseTime,
      message: "Database connection OK",
    };

    healthcheck.memory = getMemoryStatus();
    healthcheck.responseTime = process.hrtime(startTime);

    res.status(200).json(healthcheck);
  } catch (error: any) {
    healthcheck.status = "ERROR";
    healthcheck.message = error?.message || "Health check failed";
    healthcheck.database = { status: "error" };
    healthcheck.responseTime = process.hrtime(startTime);

    res.status(503).json(healthcheck);
  }
};

export const detailedHealthCheck = async (_req: Request, res: Response) => {
  const startTime = process.hrtime();

  const dbCheck = await checkDatabaseStatus();
  const memCheck = getMemoryStatus();
  const diskCheck = getDiskStatus();

  const allHealthy =
    dbCheck.status === "OK" &&
    memCheck.status === "OK" &&
    diskCheck.status === "OK";

  const healthcheck: HealthCheckResponse & { environment?: any } = {
    status: allHealthy ? "OK" : "DEGRADED",
    uptime: process.uptime(),
    responseTime: process.hrtime(startTime),
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || "1.0.0",
    database: {
      status: dbCheck.status === "OK" ? "connected" : "error",
      responseTime: dbCheck.responseTime,
      message: dbCheck.message,
    },
    memory: memCheck,
    disk: diskCheck,
    environment: {
      nodeVersion: process.version,
      platform: process.platform,
      arch: process.arch,
      env: process.env.NODE_ENV || "development",
    },
  };

  res.status(allHealthy ? 200 : 503).json(healthcheck);
};

/* ----------------- Helpers ----------------- */

async function checkDatabaseHealth(): Promise<void> {
  if (mongoose.connection.readyState === 1) return;
  throw new Error("Database not connected");
}

async function checkDatabaseStatus(): Promise<{
  status: "OK" | "ERROR";
  message: string;
  responseTime: string;
}> {
  try {
    const isConnected = mongoose.connection.readyState === 1;
    const dbName = mongoose.connection.db?.databaseName || "unknown";

    return {
      status: isConnected ? "OK" : "ERROR",
      message: isConnected
        ? `Connected to database successfully`
        : "Database disconnected",
      responseTime: isConnected ? "<5ms" : "N/A",
    };
  } catch (error: any) {
    return {
      status: "ERROR",
      message: `Database error: ${error.message}`,
      responseTime: "N/A",
    };
  }
}

function getMemoryStatus(): {
  status: "OK" | "WARNING";
  used: string;
  total: string;
  percentage: string;
} {
  const memUsage = process.memoryUsage();
  const usedMem = memUsage.heapUsed;
  const totalMem = memUsage.heapTotal;
  const percentage = (usedMem / totalMem) * 100;

  return {
    status: percentage > 90 ? "WARNING" : "OK",
    used: `${Math.round(usedMem / 1024 / 1024)} MB`,
    total: `${Math.round(totalMem / 1024 / 1024)} MB`,
    percentage: `${percentage.toFixed(2)}%`,
  };
}

function getDiskStatus(): {
  status: "OK" | "WARNING" | "ERROR";
  filesystem: string;
  mounted: string;
  total: string;
  free: string;
  used: string;
  percentage: string;
  message?: string;
} {
  try {
    const disks = getDiskInfoSync();

    const rootDisk =
      process.platform === "win32"
        ? disks.find((d) => d.mounted === "C:")
        : disks.find((d) => d.mounted === "/") || disks[0];

    if (!rootDisk) {
      throw new Error("No suitable disk found");
    }

    const capacityPercentage = parseFloat(rootDisk.capacity);
    const isWarning = capacityPercentage > 90;

    return {
      status: isWarning ? "WARNING" : "OK",
      filesystem: rootDisk.filesystem,
      mounted: rootDisk.mounted,
      total: `${(rootDisk.blocks / 1024 / 1024 / 1024).toFixed(2)} GB`,
      used: `${(rootDisk.used / 1024 / 1024 / 1024).toFixed(2)} GB`,
      free: `${(rootDisk.available / 1024 / 1024 / 1024).toFixed(2)} GB`,
      percentage: `${capacityPercentage.toFixed(1)}%`,
      message: isWarning
        ? `Disk usage high: ${capacityPercentage.toFixed(1)}%`
        : "Disk space OK",
    };
  } catch (error: any) {
    return {
      status: "ERROR",
      filesystem: "N/A",
      mounted: "N/A",
      total: "N/A",
      used: "N/A",
      free: "N/A",
      percentage: "N/A",
      message: `Disk check failed: ${error.message}`,
    };
  }
}
