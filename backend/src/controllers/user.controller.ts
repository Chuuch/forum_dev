import { Request, Response } from "express";
import User from "../../models/user.model";
import {
  getAllUsers,
  getUserById,
  updateUserService,
  deleteUserService,
} from "../services/user.service";

// Get all users
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await getAllUsers();

    const sanitizedUsers = users.map((user) => ({
      id: user.id,
      email: user.email,
      username: user.username,
      photo: user.photo,
    }));
    res.status(200).json(sanitizedUsers);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

// Get user profile
export const getProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.user?.id;

  try {
    if (!userId) {
      res.status(401).json({ message: "Unauthorized " });
      return;
    }

    const user = await getUserById(userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const { id, username, email, photo, role, city, lastActive, createdAt, updatedAt, profession } = user;

    res.status(200).json({
      id,
      username,
      email,
      photo,
      role,
      city,
      lastActive,
      memberSince: createdAt,
      profession,
      createdAt,
      updatedAt,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

// Update user profile
export const updateProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.user!.id;

  if (!userId) {
    res.status(404).json({ message: "Unauthorized" });
  }

  const updates = req.body;

  try {
    const updatedUser = await updateUserService(userId, updates);

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: updatedUser?.id,
        username: updatedUser?.username,
        email: updatedUser?.email,
        photo: updatedUser?.photo,
        role: updatedUser?.role,
        city: updatedUser?.city,
        lastActive: updatedUser?.lastActive,
        memberSince: updatedUser?.createdAt,
        profession: updatedUser?.profession,
        createdAt: updatedUser?.createdAt,
        updatedAt: updatedUser?.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete user
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user!.id;
  await deleteUserService(userId);
  res.status(200).json({ message: "User deleted successfully" });
};
