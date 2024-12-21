const express=require('express');
const routes=express.Router();


routes.get('/home',(req,res)=>{
    res.render('home');
})

module.exports=routes;