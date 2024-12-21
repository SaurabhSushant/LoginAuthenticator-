const mongoose=require('mongoose');
function connectToDB(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("connencted to DB");
    });
}

module.exports=connectToDB;