
import MessageModel from '../models/MessageModel.js';
import {mkdirSync, renameSync} from 'fs';
export const getMessages=async(req,res)=>{
    try{
      const user1=req.userId;
      const user2=req.body.id;
      if(!user1 || !user2){
        return res.status(200).json({status:'fail', message: "Both user Id's are required"})
      }
      const messages= await MessageModel.find({
        $or:[
            {sender: user1, recipient: user2},
            {sender: user2, recipient: user1}
        ]
      }).sort({timestamp: 1})
       return res.status(200).json({status:'success',messages: messages})
   
    }catch(error){
        console.log(error)
        res.status(500).json({status:'fail',message: 'Internal server error'})
    }
 
}

export const UploadFile=async(req,res)=>{
  try{
     if(!req.file){
      return res.status(200).json({status:'fail',message: 'File is required'})
      }
      const date= Date.now();
      let fileDir=`uploads/files/${date}`
      let fileName=`${fileDir}/${req.file.originalname}`
      mkdirSync(fileDir,{recursive: true})
      renameSync(req.file.path, fileName)
      return res.status(200).json({status:'success',filePath: fileName})
 
  }catch(error){
      console.log(error)
      res.status(500).json({status:'fail',message: 'Internal server error'})
  }

}

export const getLastMessage=async(req,res)=>{
  try{
    const user=req.body.user;
   
    const lastMessage = await MessageModel.find({
      $or: [
          { sender: user },
          { recipient: user }
      ]
  })
  .sort({ timestamp: -1 }) 
  .limit(1);
     return res.status(200).json({status:'success',lastMessage: lastMessage})
 
  }catch(error){
      console.log(error)
      res.status(500).json({status:'fail',message: 'Internal server error'})
  }

}
