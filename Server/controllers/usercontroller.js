const ProductModel = require("../Models/ProductModel");

module.exports={
    addProducts:async (req,res)=>{
        try{
            const {title,price,category,imageUrl,stockLeft}=req.body;
            if(!title || !price || !category || !imageUrl || !stockLeft){
                return res.status(400).json({
                    success:false,
                    status:400,
                    message:"All fields are required"
                });
            }
            else{
                const newProduct=new ProductModel({
                    title,
                    price,
                    category,
                    imageUrl,
                    stockLeft
                });
                await newProduct.save();
                return res.status(201).json({
                    success:true,
                    status:201,
                    message:"Product added successfully",
                    data:newProduct
                });
            }
        }
        catch(err){
            return res.status(400).json({
                success:false,
                status:400,
                message:"Internal server error",
                error:err.message
            })
        }
    },
    updateProduct:async (req,res)=>{
        try{
            const {id}=req.params;
            const {title,price,description,imageUrl,stockLeft}=req.body;
            if(!title || !price || !description || !imageUrl || !stockLeft){
                return res.status(400).json({
                    success:false,
                    status:400,
                    message:"All fields are required"
                });
            }
            const updatedProduct=await ProductModel.findByIdAndUpdate(id,{
                title,
                price,
                description,
                imageUrl,
                stockLeft
            },{
                new:true
            });
            if(!updatedProduct){
                return res.status(404).json({
                    success:false,
                    status:404,
                    message:"Product not found"
                });
            }
            return res.status(200).json({
                success:true,
                status:200,
                message:"Product updated successfully",
                data:updatedProduct
            });
        }
        catch(err){
            return res.status(400).json({
                success:false,
                status:400,
                message:"Internal server error",
                error:err.message
            })
        }
    },
    deleteProduct:async (req,res)=>{
        try{
            const {id}=req.params;
            const deletedProduct=await ProductModel.findByIdAndDelete(id);
            if(!deletedProduct){
                return res.status(404).json({
                    success:false,
                    status:404,
                    message:"Product not found"
                });
            }
            return res.status(200).json({
                success:true,
                status:200,
                message:"Product deleted successfully",
                data:deletedProduct
            });
        }
        catch(err){
            return res.status(400).json({
                success:false,
                status:400,
                message:"Internal server error",
                error:err.message
            })
        }
    }
}