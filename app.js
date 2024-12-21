
const dotenv=require('dotenv');


require('dotenv').config();
console.log('JWT_SECRET:', process.env.JWT_SECRET);
const express=require('express');

const app=express();
const userRouter=require('./routes/user.routes');
const indexRouter=require('./routes/index.routes');
const connectToDB=require('./config/db');
connectToDB();
const cookieParser=require('cookie-parser');


app.set('view engine','ejs');  
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/',indexRouter);
app.use('/user',userRouter);

app.listen(3000,(req,res)=>{

    console.log('server running on port 3000');
})