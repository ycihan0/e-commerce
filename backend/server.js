const express =require("express");
const app=express();

app.get("/",(req, res)=>{
    res.send("Hello Express.js");
} );

app.listen(500,()=>{
    console.log(`sunucu ${5000} portunda çalışıyor.`)
})