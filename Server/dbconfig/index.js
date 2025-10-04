const mongoose=require('mongoose');
MONGODB_URI_STRING=process.env.MONGODB_URI_STRING;


mongoose.connect(MONGODB_URI_STRING)
.then(()=>{
    console.log("E_commerce_project connected succesfully");
})
.catch((err)=>{
    console.log("Error connecting to MongoDB",err);
});