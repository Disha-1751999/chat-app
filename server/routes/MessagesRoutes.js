import express from 'express'
import * as MessageController from '../controllers/MessageController.js'
import AuthMiddleware from '../middlewares/AuthMiddleware.js'
import multer from 'multer';

const MessageRouter=express.Router();

const upload= multer({dest:"uploads/files" })
MessageRouter.post('/get-messages',AuthMiddleware,MessageController.getMessages);
MessageRouter.post('/upload-file',AuthMiddleware,upload.single("file"),MessageController.UploadFile)
MessageRouter.post('/last-message',AuthMiddleware,MessageController.getLastMessage)




export default MessageRouter;