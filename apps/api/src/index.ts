import express, { Request, Response } from "express";
import dotenv from "dotenv";
import session from "express-session";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import { connectToDatabase } from "../src/config/mongo";
import passport from "../src/config/passport"; 
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import healthRoutes from "./routes/healthRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

connectToDatabase();

const allowedOrigins = ["http://localhost:5000", "http://localhost:5173"];

const corsOptions: cors.CorsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(helmet());
app.use(cors(corsOptions));

app.use(bodyParser.json({ limit: "20mb" }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: false }));

app.use(
  session({
    secret:
      process.env.SESSION_SECRET || 'my-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Here!!");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/health", healthRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
