const express= require('express');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"/views"));

const sessionOptions = {
    secret: "musupersecret",
    resave: false,
    saveUninitialized: true 
}

app.use(session(sessionOptions));
app.use(flash());

app.get("/register",(req,res)=>{
    let {name = "anamika"} = req.query;
    req.session.name = name;
    req.flash("success", "welcome to the site!");
    res.redirect("/hello");
});

app.get("/hello",(req,res)=>{
    res.locals.messages = req.flash("success");
    res.render("page.ejs",{name: req.session.name});
});


app.listen(3000,()=>{
    console.log("server is listing to port 3000");
});