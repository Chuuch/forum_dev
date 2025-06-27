import Notification from "../../models/notification.model";
import { NotificationCreationAttributes } from "../../models/notification.model";
import User from "../../models/user.model";

interface CreateNotificationInput extends Omit<NotificationCreationAttributes, 'id' | 'createdAt' | 'updatedAt'> {
  userId: string;
  type: "comment" | "vote";
  message: string;
  referenceId?: string;
}

export const createNotification = async (
  data: CreateNotificationInput
): Promise<Notification> => {
  if (!data.type || !data.message) {
    throw new Error("Notification type and message are required");
  }

  const user = await User.findByPk(data.userId);
  if (!user) {
    throw new Error("User not found");
  }

  return await Notification.create(data);
};

export const getUserNotifications = async (userId: string): Promise<Notification[]> => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error("User not found");
  }

  return await Notification.findAll({
    where: { userId },
    order: [['createdAt', 'DESC']],
    limit: 50
  });
};

export const markAsRead = async (id: string): Promise<Notification> => {
  const notification = await Notification.findByPk(id);
  if (!notification) {
    throw new Error("Notification not found");
  }

  await Notification.update({ isRead: true }, { where: { id } });
  return Notification.findByPk(id) as Promise<Notification>;
};

export const markAllAsRead = async (userId: string): Promise<void> => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error("User not found");
  }

  await Notification.update(
    { isRead: true },
    { where: { userId, isRead: false } }
  );
};
