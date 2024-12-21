 const express=require('express');
 const router=express.Router();
 const { body, validationResult } = require('express-validator');
const userModel=require('../models/user.model')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');



 router.get('/register',(req,res)=>{
    res.render('register');
 })

 router.post('/register',
 body('username').trim().isLength({min:3}),
 body('password').trim().isLength({min:5}),
 body('email').trim().isEmail().isLength({min:13})

 ,async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({
            errors:errors.array(),
            message:'Invalid data'

        })
    }
    const {username,password,email}=req.body;
    const hashPassword= await bcrypt.hash(password,10)
    const newUser=await userModel.create({
        email,
        username,
        password: hashPassword
    })
    res.json(newUser)
 })

 router.get('/login',(req,res)=>{
    res.render('login');
 })

 router.post('/login', async (req, res) => {
    console.log('Login attempt:', req.body); // Log incoming request data

    const { username, password } = req.body;
    console.log('Username:', username); // Log the username

    try {
        const user = await userModel.findOne({ username });
        if (!user) {
            console.log('User not found'); // Log if user is not found
            return res.status(400).json({ message: 'Username or password is incorrect' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Password mismatch'); // Log if password does not match
            return res.status(400).json({ message: 'Username or password is incorrect' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        console.log('Token generated:', token); // Log the generated token
        res.cookie('token', token, { httpOnly: true });
        res.json({ message: 'Logged in successfully', token });
    } catch (error) {
        console.error('Error during login:', error); // Log any errors
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});



 

 module.exports=router;