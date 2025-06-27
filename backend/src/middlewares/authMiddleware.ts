// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { verifyToken } from "../utils/jwt";
import User from "../../models/user.model";
import { JwtPayload } from "jsonwebtoken";

// Extend JwtPayload to include the id field
export interface CustomJwtPayload extends JwtPayload {
  id: string;
}

// Ensure the middleware is typed correctly as RequestHandler
export const authMiddleware = async (
  req: Request,
  res: Response<any>,
  next: NextFunction
): Promise<void> => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ message: "Not authorized, token missing" });
    return;
  }

  try {
    // Verify the token and extract the payload
    const decoded = verifyToken(token) as CustomJwtPayload;

    // If there's no id in the token, the token is invalid
    if (!decoded.id) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    // Find the user with the id from the token
    const user = await User.findByPk(decoded.id);

    // If no user is found with the decoded id, return 401
    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    user.lastActive = new Date();
    await user.save();

    // Attach user details to req.user
    req.user = {
      id: user.id,
      username: user.username,
      email: user.email,
      photo: user.photo,
      role: user.role,
      city: user.city,
      profession: user.profession,
      lastActive: user.lastActive,
    };

    // Call next to proceed to the next middleware or route handler
    return next();
  } catch (error) {
    console.error("Jwt auth error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
    return;
  }
};
