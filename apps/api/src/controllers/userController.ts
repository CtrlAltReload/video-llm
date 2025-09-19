import { Request, Response } from "express";
import * as userService from "../services/userService";
import { ValidationError } from "../utils/errors";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    const user = await userService.getUserById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({
        error: "Missing required fields: name and email are required",
      });
    }

    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(409).json({
        error: "User with this email already exists",
      });
    }

    if (err instanceof ValidationError) {
      return res.status(400).json({ error: err.message });
    }

    res.status(500).json({ error: "Failed to create user" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "No update data provided" });
    }

    const user = await userService.updateUser(id, req.body);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(409).json({
        error: "Email already exists",
      });
    }

    if (err instanceof ValidationError) {
      return res.status(400).json({ error: err.message });
    }

    res.status(500).json({ error: "Failed to update user" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    const user = await userService.deleteUser(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "User deleted successfully",
      deletedAt: user.deletedAt,
    });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ error: "Failed to delete user" });
  }
};

export const restoreUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    const user = await userService.restoreUser(id);
    if (!user) {
      return res.status(404).json({ error: "Deleted user not found" });
    }
    
    res.status(200).json({ 
      message: "User restored successfully",
      user 
    });
  } catch (err) {
    console.error('Error restoring user:', err);
    res.status(500).json({ error: "Failed to restore user" });
  }
};

export const getDeletedUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getDeletedUsers();
    res.json(users);
  } catch (err) {
    console.error('Error fetching deleted users:', err);
    res.status(500).json({ error: "Failed to fetch deleted users" });
  }
};

export const permanentlyDeleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    const user = await userService.permanentlyDeleteUser(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    res.status(204).send();
  } catch (err) {
    console.error('Error permanently deleting user:', err);
    res.status(500).json({ error: "Failed to permanently delete user" });
  }
};