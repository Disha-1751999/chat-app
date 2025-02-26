import express from 'express'
import * as ContactController from '../controllers/ContactController.js'
import AuthMiddleware from '../middlewares/AuthMiddleware.js'

const contactRouter=express.Router();

contactRouter.get('/search/:keyword',AuthMiddleware,ContactController.SearchContacts)
contactRouter.get('/get-contacts-for-dm',AuthMiddleware,ContactController.getContactsForDMList)
contactRouter.get('/get-all-contacts',AuthMiddleware,ContactController.GetAllContacts)



export default contactRouter;