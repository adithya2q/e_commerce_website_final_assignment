const mongoose=require('mongoose');

const cartSchema=new mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Products',
        required:true
    },
    quantity:{
        type:Number,
        default:1
    }
},{
    timestamps:true
});

const MyOrdersSchema=new mongoose.Schema({
        productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Products',
        required:true
    },
    quantity:{
        type:Number,
        required:true
    }
},{
    timestamps:true
}
)

const customerSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    cart:[cartSchema],
    MyOrders:[MyOrdersSchema]
    
},{
    timestamps:true
}
);

const CustomerModel=mongoose.model("Customers",customerSchema);

module.exports=CustomerModel;

