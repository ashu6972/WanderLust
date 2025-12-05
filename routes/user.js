const express = require('express');
const router = express.Router();
const User = require('../models/user');
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');
const { saveRedirectUrl } = require('../middleaware');

router.get('/signup',(req,res)=>{
    res.render('users/signup');
});

router.post('/signup', wrapAsync(async (req,res,next)=>{
    try{
        let {username, password, email} = req.body;
        const newUser = new User({username, email});
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if(err) {
                return next(err);
            }
            req.flash('success', 'Welcome to Waderlust!');
            res.redirect('/listings');
        });
    }
    catch(e){
        req.flash('error', e.message);
        res.redirect('/signup');
    }
}));


router.get('/login',(req,res)=>{
    res.render("users/login");
})

router.post('/login',
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login", 
        failureFlash: true
    }), 
    (req, res) => {
        req.flash('success', 'Welcome back to Waderlust!');
        let redirectUrl = res.locals.redirectUrl || '/listings';
        res.redirect(redirectUrl);
    }
);

router.get('/logout',(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash('success','you are logged out');
        res.redirect('/listings');

    })
})

module.exports = router;