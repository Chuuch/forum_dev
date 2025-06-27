import express from "express";
import * as notificationController from "../controllers/notification.controller";
const notificationRouter = express.Router();

notificationRouter.post("/", notificationController.create);
notificationRouter.get("/user/:userId", notificationController.getForUser);
notificationRouter.patch("/:id/read", notificationController.markAsRead);
notificationRouter.patch("/all/read", notificationController.markAllAsRead);

export default notificationRouter;
