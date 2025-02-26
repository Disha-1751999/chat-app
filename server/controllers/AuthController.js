import { TokenEncode } from '../utilities/tokenUtility.js';
import UserModel from './../models/UserModel.js';
import bcrypt from 'bcrypt';
import {renameSync,unlinkSync} from "fs"

export const Register=async(req,res)=>{
   try{
    const {email,password}= req.body
    if(!email || !password){
      return res.status(200).json({status:'success',message: 'Email and Password is required'})
    }

    const isUserExist= await UserModel.findOne({email:email})
    
     if(isUserExist){
      
        return res.status(200).json({status:'fail',message: 'Email already registered'})
        
     }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user= await UserModel.create({email:email,password: hashedPassword})
    if(user){
        const token= TokenEncode(email, user._id)
        res.cookie('token',token,{
            maxAge:3*24*60*60*1000,
            secure:true,
            sameSite:'None',
            
        })
        return res.status(200).json({status:'success',message: 'Register Successful',data:user})
    }
   }catch(error){
       console.log(error)
       res.status(500).json({status:'fail',message: 'Internal server error'})
   }

}

export const GetUserInfo=async(req,res)=>{
    try{
       const user= await UserModel.findById(req.userId)
       if(!user){
        return  res.status(200).json({status:'fail',message: 'User not found'})
       }
       return res.status(200).json({status:'success',data:user})
    
        
     
    }catch(error){
        console.log(error)
        res.status(500).json({status:'fail',message: 'Internal server error'})
    }
 
 }

 export const Login=async(req,res)=>{
    try{
     const {email,password}= req.body
     if(!email || !password){
        return  res.status(200).json({status:'fail',message: 'Email and Password is required'})
     }     
 
     const user= await UserModel.findOne({email:email})

     if(!user){
        return  res.status(200).json({status:'fail',message: 'User not found'})
     }

     const passwordMatch = await bcrypt.compare(password, user.password);
     if (passwordMatch) {
         const token= TokenEncode(email, user._id)
         res.cookie('token',token,{
             maxAge:3*24*60*60*1000,
             secure:true,
             sameSite:'None'
         })
         return res.status(200).json({status:'success',message: 'login Successful',data:user})
     }
     else{
        return res.status(200).json({status:'fail',message: 'Wrong Password'})
     }
    }catch(error){
        console.log(error)
        res.status(500).json({status:'fail',message: 'Internal server error'})
    }
 
 }

 export const UpdateProfile=async(req,res)=>{
    try{
      const userId= req.userId
     const {firstName,lastName,color}= req.body
     if(!firstName || !lastName ){
        return  res.status(200).json({status:'fail',message: 'Provide all information to complete setup'})
     }     
 
     const user = await UserModel.findByIdAndUpdate(
        userId,
        { $set: { firstName, lastName, color, profileSetup: true } },
        { new: true , runValidators:true} 
      );

     if(!user){
        return  res.status(200).json({status:'fail',message: 'User not found'})
     }

         return res.status(200).json({status:'success',message: 'Profile Updated Successfully',data:user})
   
    }catch(error){
        console.log(error)
        res.status(500).json({status:'fail',message: 'Internal server error'})
    }
 
 }

export const UpdateProfileImage=async(req,res)=>{
   try{
      if(!req.file){
         return  res.status(400).json({status:'fail',message: 'Please provide profile image'})
      }     
    const date= Date.now();
    let fileName= "uploads/profiles/" + date + req.file.originalname
    renameSync(req.file.path,fileName) 
    await UserModel.updateOne({_id:req.userId},{image:fileName},{new:true,runValidators:true})

   
    
    return res.status(200).json({status:'success',message: 'Profile Updated Successfully', data:fileName})
  
   }catch(error){
       console.log(error)
       res.status(500).json({status:'fail',message: 'Internal server error'})
   }

}

export const DeleteProfileImage=async(req,res)=>{
   try{
     const userId= req.userId
     const user = await UserModel.findById(userId);
  
    if(!user){
       return  res.status(200).json({status:'fail',message: 'User not found'})
    }
    if(user.image){
    unlinkSync(user.image) 
    }
    user.image=null
    await user.save()
   return res.status(200).json({status:'success',message: 'Profile Image Deleted Successfully'})
  
   }catch(error){
       console.log(error)
       res.status(500).json({status:'fail',message: 'Internal server error'})
   }

}

export const Logout=async(req,res)=>{
   try{
      res.clearCookie('token');
      return res.status(200).json({status:'success',message: 'Logout Successfully'})
  
   }catch(error){
       console.log(error)
       res.status(500).json({status:'fail',message: 'Internal server error'})
   }

}
