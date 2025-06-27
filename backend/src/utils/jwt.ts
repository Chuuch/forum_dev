import jwt from "jsonwebtoken";
import { CustomJwtPayload } from "../middlewares/authMiddleware";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const generateToken = (
  userId: string,
  role: string,
  email: string
): string => {
  return jwt.sign({ id: userId, role: role, email: email }, JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const verifyToken = (token: string): CustomJwtPayload => {
  return jwt.verify(token, JWT_SECRET) as CustomJwtPayload;
};
