import mongoose from "mongoose";

const DataSchema= mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true,
    },
    recipient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:false,
    },
    messageType:{
        type:String,
        required:true,
        enum:["text","file"]
    },
    content:{
        type:String,
        required: function(){    
            return this.messageType === "text"  
                
        },
    },
    fileUrl:{
        type:String,
        required: function(){
            return this.messageType === "file"           
        },
    },
    timestamp:{
       type:Date,
       default:Date.now,

    }

}, {timestamps: true, versionKey: false});

const MessageModel=mongoose.model('messages', DataSchema);

export default MessageModel; 