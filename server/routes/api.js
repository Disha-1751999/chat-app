import express from 'express'
import * as AuthController from '../controllers/AuthController.js'
import AuthMiddleware from '../middlewares/AuthMiddleware.js'
import multer from 'multer';

const router=express.Router();
const upload= multer({dest:"uploads/profiles/"})

router.post('/register',AuthController.Register)
router.post('/login',AuthController.Login)
router.get('/user-info',AuthMiddleware,AuthController.GetUserInfo)
router.post('/update-profile',AuthMiddleware,AuthController.UpdateProfile)
router.post('/update-profile-image',AuthMiddleware,upload.single("profile-image"),AuthController.UpdateProfileImage)
router.delete('/delete-profile-image',AuthMiddleware,AuthController.DeleteProfileImage)
router.get('/logout',AuthMiddleware,AuthController.Logout)

export default router;