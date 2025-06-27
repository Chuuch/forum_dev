import { Request, Response } from "express";
import * as notificationService from "../services/notification.service";

export const create = async (req: Request, res: Response) => {
  const notification = await notificationService.createNotification(req.body);
  res.status(201).json(notification);
};

export const getForUser = async (req: Request, res: Response) => {
  const notifications = await notificationService.getUserNotifications(
    req.params.userId
  );
  res.json(notifications);
};

export const markAsRead = async (req: Request, res: Response) => {
  await notificationService.markAsRead(req.params.id);
  res.status(200).json({ message: "Marked as read" });
};

export const markAllAsRead = async (req: Request, res: Response) => {
  await notificationService.markAllAsRead(req.params.userId);
  res.status(200).json({ message: "Marked all as read" });
};
