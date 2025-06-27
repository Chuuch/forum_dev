import { Request, Response } from "express";
import { uploadAvatarService } from "../services/upload.service";
import User from "../../models/user.model";

export const uploadController = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.file) {
    res.status(400).json({ message: "No file uploded." });
    return;
  }

  try {
    const photo = await uploadAvatarService(req.user!.id, req.file);
    const user = await User.findByPk(req.user!.id);
    res.json({ message: "Uploaded successfully", user });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Failed to upload image" });
  }
};
