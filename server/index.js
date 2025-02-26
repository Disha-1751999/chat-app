import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import  dotenv from 'dotenv';
import router from './routes/api.js';
import contactRouter from './routes/ContactRoutes.js';
import MessagesRouter from './routes/MessagesRoutes.js';
import setupSocket from './socket.js';
import { Server } from 'socket.io';



dotenv.config();

const app=express();

app.use(cors({ origin: process.env.ORIGIN,credentials: true}));
app.use("/uploads/profiles", express.static("uploads/profiles"))
app.use("/uploads/files", express.static("uploads/files"))

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api',router);
app.use('/contacts',contactRouter);
app.use('/messages',MessagesRouter);

// Database Connect
mongoose.connect(process.env.DATABASE,{autoIndex:true}).then(()=>{
    console.log("MongoDB connected");
}).catch(()=>{
    console.log("MongoDB disconnected");
})


const server=app.listen(process.env.PORT,function(){
    console.log("Server started on port "+process.env.PORT)
})

setupSocket(server)


export default app;





