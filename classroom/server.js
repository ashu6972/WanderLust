const express= require('express');
const app = express();

app.get("/",(requestAnimationFrame,res)=>{
    res.send("Hi, I am root!");
})

app.listen(3000,()=>{
    console.log("server is listing to port 3000");
})