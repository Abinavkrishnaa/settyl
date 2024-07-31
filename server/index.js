import express from 'express';
import bcrypt from "bcryptjs"
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import cors from "cors";
import mongoose from 'mongoose';
import employeeRoutes from './routes/employee.route.js';
import authRoutes from './routes/auth.route.js'

const app = express()
app.use(express.json());
app.use(cors());
dotenv.config();
mongoose.connect(process.env.MONGO_URL).then(
    console.log("connected to db")).catch((err)=>{
        console.log("not connected to db" , err)
})

app.use('/api/employees' , employeeRoutes);
app.use('/api/auth', authRoutes)
const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`server is running on port  ${port}` );
})
