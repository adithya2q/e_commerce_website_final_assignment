const mongoose=require('mongoose');

const AdminSchema=mongoose.Schema({
        name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    }

},
{timestamps:true}
);


const AdminModel=mongoose.model("Admins",AdminSchema);
module.exports=AdminModel;
 