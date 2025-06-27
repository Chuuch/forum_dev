import { Request, Response } from "express";
import User from "../../models/user.model";
import { uploadAvatarService } from "../services/upload.service";

export const uploadController = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.file) {
    res.status(400).json({ message: "No file uploaded." });
    return;
  }

  try {
    console.log("Upload request received:", {
      userId: req.user!.id,
      filename: req.file.filename,
      originalname: req.file.originalname
    });

    const photo = await uploadAvatarService(req.user!.id, req.file);
    const user = await User.findByPk(req.user!.id);
    
    console.log("Upload successful:", {
      photo,
      userPhoto: user?.photo
    });

    res.json({ 
      message: "Uploaded successfully", 
      user: {
        id: user?.id,
        username: user?.username,
        email: user?.email,
        photo: user?.photo,
        role: user?.role,
        city: user?.city,
        lastActive: user?.lastActive,
        memberSince: user?.createdAt,
        profession: user?.profession,
        createdAt: user?.createdAt,
        updatedAt: user?.updatedAt,
      }
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Failed to upload image" });
  }
};
