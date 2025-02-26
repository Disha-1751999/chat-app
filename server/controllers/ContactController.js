
import mongoose from 'mongoose';
import UserModel from './../models/UserModel.js';
import MessageModel from './../models/MessageModel.js';
export const SearchContacts=async(req,res)=>{
    try{
       const {keyword}= req.params;
       if(keyword==undefined || keyword==null){
        return res.status(200).json({status:'success',message: 'PLease provide search information.'})
       }

       const sanitizedKeyword=keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
       const regex= new RegExp(sanitizedKeyword,"i")
       const contacts= await UserModel.find({
        $and:[{_id:{$ne:req.userId}},{$or:[{firstName:regex},{lastName:regex},{email:regex}]}]
       })
       return res.status(200).json({status:'success',contacts: contacts})
   
    }catch(error){
        console.log(error)
        res.status(500).json({status:'fail',message: 'Internal server error'})
    }
 
}

export const getContactsForDMList=async(req,res)=>{
    try{
       let {userId}= req;
       userId= new mongoose.Types.ObjectId(userId)

       const contacts= await MessageModel.aggregate([
        {
            $match:{
                $or:[{sender:userId},{recipient: userId}],
            },
        },
        {
            $sort:{timestamp: -1},
        },
        {
            $group:{
                _id:{
                    $cond:{
                        if:{ $eq: ["$sender", userId]},
                        then: "$recipient",
                        else: "$sender"
                    },
                },
                lastMessageTime: {$first: "$timestamp"},
            }
        },
        {
            $lookup:{
                from:"users",
                localField: "_id",
                foreignField:"_id",
                as:"contactInfo"
            }
        },
        {
            $unwind:"$contactInfo"
        },
        {
            $project:{
                _id:1,
                lastMessageTime:1,
                email:"$contactInfo.email",
                firstName:"$contactInfo.firstName",
                lastName:"$contactInfo.lastName",
                image:"$contactInfo.image",
                color:"$contactInfo.color",
            }
        },
        {
            $sort:{
                lastMessageTime: -1
            }
        }
       ])
       return res.status(200).json({status:'success',contacts: contacts})
   
    }catch(error){
        console.log(error)
        res.status(500).json({status:'fail',message: 'Internal server error'})
    }
 
}

export const GetAllContacts=async(req,res)=>{
    try{
       const userId= req.userId;
       const users= await UserModel.find({_id:{$ne: userId}}, "firstName lastName _id email")
       const contacts= users.map((user)=>(
        {
            label: user.firstName ? `${user.firstName} ${user.lastName}` : user.email
    
           }
       ))
       return res.status(200).json({status:'success',contacts: contacts})
   
    }catch(error){
        console.log(error)
        res.status(500).json({status:'fail',message: 'Internal server error'})
    }
 
}

