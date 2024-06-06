const express = require("express")
const connection = require("./db")
const { userRouter } = require("./backend/routes/user.route")
require("dotenv").config()
const app =express()

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("welcome to rawsql app")
})

app.use("/user",userRouter)

const port = process.env.PORT || 3000

app.listen(3000,async()=>{
    await connection
    console.log("server is running on port 3000")
})