import User from "../../models/user.model";
import path from "path";
import fs from "fs";

// TODO: Implement S3 later on!

export const uploadAvatarService = async (
  userId: string,
  file: Express.Multer.File
) => {
  const user = await User.findByPk(userId);

  if (!user) {
    throw new Error("User not found");
  }

  if (user.photo) {
    const oldPath = path.join(__dirname, "..", "..", "uploads", user.photo);

    if (fs.existsSync(oldPath)) {
      fs.unlinkSync(oldPath);
    }
  }

  user.photo = file.filename;
  await user.save();

  return file.filename;
};
