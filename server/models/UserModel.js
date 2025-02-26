import mongoose from "mongoose";

const DataSchema= mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:[true, 'Email is required'],
        lowercase:true,trim:true
    },
    password:{type:String,required:[true, 'Password is required'],trim:true},
    firstName:{type:String},
    lastName:{type:String},
    image:{type:String},
    color:{type:Number},
    profileSetup:{type:Boolean,
        default: false
    },

}, {timestamps: true, versionKey: false});

const UserModel=mongoose.model('users', DataSchema);

export default UserModel;