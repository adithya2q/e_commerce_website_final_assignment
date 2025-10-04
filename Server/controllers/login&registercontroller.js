const AdminModel = require("../Models/AdminModel");
const CustomerModel = require("../Models/CustomerModel");
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken');

module.exports={
    Login:async (req,res)=>{
        try{
            const {email,password,role}=req.body;
            if(!email || !password || !role){
                return res.status(400).json({
                    success:false,
                    status:400,
                    message:"All fields are required"
                });
             }
             else{
                if(role==='admin'){
                    const adminFound=await AdminModel.findOne({email}).lean()
                    if(adminFound){
                        const isPasswordMatch=await bcrypt.compare(password,adminFound.password);
                        if (isPasswordMatch){
                            delete adminFound.password;
                            const token=jwt.sign({_id:adminFound._id},process.env.JWT_SECRET_KEY,{expiresIn:'5d'});
                            return res.status(200).json({
                                success:true,
                                status:200,
                                message:"Admin fetched successfully",
                                data:adminFound,
                                token:token
                            });
                        }
                    }
                }
                else if(role==='customer'){
                const customerFound=await CustomerModel.findOne({email}).lean()
                if(customerFound){
                    const isPasswordMatch=await bcrypt.compare(password,customerFound.password);
                    if (isPasswordMatch){
                        delete customerFound.password;
                        const token=jwt.sign({_id:customerFound._id},process.env.JWT_SECRET_KEY,{expiresIn:'5d'});
                        return res.status(201).json({
                            success:true,
                            status:201,
                            message:"Customer fetched successfully",
                            data:customerFound,
                            token:token
                        });
                    }
                }
            }
                else{
                    return res.status(401).json({
                        success:false,
                        status:401,
                        message:"Invalid credentials"
                    })
                };
             };
    }
        catch(err){
            return res.status(500).json({
                success:false,
                status:500,
                message:'Internal server error',
                error:err.message
            });
            }
    },
    Register:async(req,res)=>{
        try{
            const{name,email,phone,password,confirmPassword}=req.body;
            if(!name || !email || !phone || !password || !confirmPassword){
                return res.status(400).json({
                    success:false,
                    status:400,
                    message:"All fields are required"
                });
            }
            const existingCustomer=await CustomerModel.findOne({email:email}).lean();
            if(existingCustomer){
                return res.status(401).json({
                    success:false,
                    status:401,
                    message:"Customer already exists"
                });
            }

            if (password !== confirmPassword){
                return res.status(400).json({
                    success:false,
                    status:400,
                    message:'Passwords do not match'
                })
                
            }

            const encryptedPassword=await bcrypt.hash(password,10);
            const newCustomer=new CustomerModel({
                name,email,phone,password:encryptedPassword
            });
            await newCustomer.save();
            return res.status(201).json({
                success:true,
                status:201,
                message:"Customer created successfully",
                data:newCustomer
            });
        }
        catch(err){
            return res.status(500).json({
                sucess:false,
                status:500,
                message:"Internal server error",
                error:err.message
            });
        }
    
    },
}