const express = require("express")
const bcrypt = require("bcrypt");
const connection = require("../../db");
const userRouter = express.Router()

userRouter.post("/register",async(req,res)=>{
    const {name,age,email,password} = req.body;
    const hashPassword = bcrypt.hashSync(password,5)
    const query = "INSERT INTO users (name,age,email,password) VALUES (?,?,?,?)";
     connection.query(query,[name,age,email,hashPassword],(err,result)=>{
        if(err){
            console.error("Error inserting user data",err)
            res.status(500).json({message:"server error"})
        }
        res.status(201).json({message:"user regisrered sucessfully",userId:result.insertId})
    })
})

userRouter.post("/login",(req,res)=>{
    const {email,password} = req.body

    const query = "SELECT * FROM  users WHERE email = ?";
    connection.query(query,[email], async (err,result)=>{
        if(err){
            console.error("Error fetching user",err)
            return res.status(500).json({message:"Server error"})
        }
        if(result.length===0){
            return res.status(401).json({message:"Invaid email"})
        }

        const user = result[0]
        const isMatch = bcrypt.compareSync(password,user.password)

        if(!isMatch){
            return res.status(401).json({message:"Invalid Credentials"})
        }
        res.json({message:"Login Successful"})
    })
})





module.exports={
    userRouter
}