import bcrypt from "bcryptjs";
import { Op } from "sequelize";
import User, { UserRole } from "../../models/user.model";
import { UserProps } from "../types/types";
import { generateToken } from "../utils/jwt";


// TODO: Add OAuth with Google

export const registerUser = async (
  username: string,
  email: string,
  password: string,
  photo?: string
): Promise<UserProps> => {
  const existingUser = await User.findOne({
    where: {
      [Op.or]: [{ username }, { email }],
    },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    photo,
    role: UserRole.USER,
  });

  const token = generateToken(user.id, user.role, user.email);

  return {
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      photo: user.photo,
      role: user.role,
      city: user.city,
      lastActive: user.lastActive,
      memberSince: user.createdAt,
      profession: user.profession,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
    token,
  };
};

export const loginUser = async (
  email: string,
  password: string
): Promise<UserProps> => {
  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("Invalid credentials");
  }

  // Update lastActive
  user.lastActive = new Date();
  await user.save();

  const token = generateToken(user.id, user.role, user.email);

  return {
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      photo: user.photo,
      role: user.role,
      city: user.city,
      lastActive: user.lastActive,
      memberSince: user.createdAt,
      profession: user.profession,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
    token,
  };
};
