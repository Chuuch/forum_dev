import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  console.error(err);
  res.status(500).json({ error: err.message || "Internal Server Error" });
  return err;
};
