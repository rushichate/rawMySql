const mysql = require("mysql2")

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"RVushi97@$%",
    database:"rawsql"
})

connection.connect(err =>{
    if(err){
        console.error("Error connecting sql",err)
        return;
    }
    console.log("Connected to mysql")
})

module.exports = connection