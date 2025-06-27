import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import {
  authRouter,
  userRouter,
  postRouter,
  commentRouter,
  notificationRouter,
  uploadRouter,
  voteRouter,
  categoryRouter,
} from "./routes";
import { errorHandler } from "./middlewares/errorHandler";
import db from "../config/db";
import path from "path";

dotenv.config();

const app: Express = express();

const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5173", // Vite dev server or frontend URL
  credentials: true, // allow sending cookies from client
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/api/upload", uploadRouter);
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);
app.use("/api/votes", voteRouter);
app.use("/api/notifications", notificationRouter);
app.use("/api/categories", categoryRouter);
app.use(errorHandler);

db.sync()
  .then(() => {
    // Import associations after database sync
    require("../models/associations");
    
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

export default app;
