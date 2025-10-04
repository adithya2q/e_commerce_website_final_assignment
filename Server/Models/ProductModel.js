const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true},
    price:{
        type:Number,
        required:true},
    category:{
        type:String,
        required:true},
    imageUrl:{
        type:String,
        required:true},
    stockLeft:{
        type:Number,
        required:true
    },
        isActive:{
        type:Boolean,
        default:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},
{timestamps:true}
);

const ProductModel=mongoose.model('Products',productSchema);
module.exports=ProductModel;


