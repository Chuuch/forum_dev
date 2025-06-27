import { Request, Response, NextFunction } from "express";
import { UserRole } from "../../models/user.model";

export function roleMiddleware(requiredRole: UserRole) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user || user.role !== requiredRole) {
      return res.status(403).json({ message: "Access denied." });
    }

    next();
  };
}
