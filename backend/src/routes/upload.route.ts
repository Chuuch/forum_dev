import { Router } from 'express';
import { upload } from '../middlewares/multer';
import { authMiddleware } from '../middlewares/authMiddleware';
import { uploadController } from '../controllers/upload.controller';

const uploadRouter = Router();

uploadRouter.post("/avatar", authMiddleware, upload.single("file"), uploadController);

export default uploadRouter;