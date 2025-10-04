const CustomerModel = require("../Models/CustomerModel");
const ProductModel = require("../Models/ProductModel");


const Stripe=require('stripe');
const stripe=new Stripe(process.env.STRIPE_SECRET_KEY);

module.exports={
        getProducts:async (req,res)=>{
        try{
            const products=await ProductModel.find({isDeleted:false});
            const search=req.query.search;
            if(search){
                const filteredProducts=products.filter(product=>product.title.toLowerCase().includes(search.toLowerCase()));
                if(filteredProducts.length==0){
                    return res.status(404).json({
                        success:false,
                        status:404,
                        message:'no productsfound',
                        data:[]
                    });
                }
                else if(filteredProducts.length>0){
                    return res.status(201).json({
                        success:true,
                        status:201,
                        message:'Products fetched successfully',
                        data:filteredProducts
                    });
                }
            }
                else{
                    return res.status(200).json({
                        success:true,
                        status:200,
                        message:"Products fetched successfully",
                        count:products.length,
                        data:products
                    })
                }
                    
        }
        catch(err){
            return res.status(500).json({
                success:false,
                status:500,
                message:"Internal server error",
                error:err.message
            });
        }
    },
    
    addProductToCart:async (req,res)=>{
        try{
            const {customerId,product}=req.body;

            if(!customerId || !product || !product.id ){
                return res.status(400).json({
                    success:false,
                    status:400,
                    message:"All fields are required"
                });
            }
            const customerFound=await CustomerModel.findById(customerId);
            if(!customerFound){
                return res.status(404).json({
                    success:false,
                    status:404,
                    message:"Customer not found"
                });
            }
            const productFound=await ProductModel.findById(product.id);
            if(!productFound){
                return res.status(404).json({
                    success:false,
                    status:404,
                    message:"Product not found"
                });
            }

            const isAlreadyInCart=customerFound.cart.some(item=>item.productId.toString()===product.id);
            if(isAlreadyInCart){
                return res.status(400).json({
                    success:false,
                    status:400,
                    message:"Product already in cart"
                })
            }

            customerFound.cart.push({productId:product.id});
            await customerFound.save();
            return res.status(201).json({
                success:true,
                status:201,
                message:"Product added to cart successfully",
                data:customerFound
            });
        }
                catch(err){
            return res.status(500).json({
                success:false,
                status:500,
                message:"Internal server error",
                error:err.message
            });
        }
    },
    getCart:async(req,res)=>{
        try{
            const {customerId}=req.body;
            if(!customerId){
                return res.status(400).json({
                    success:false,
                    status:400,
                    message:"Customer ID is required"
                });
            }
            console.log("Customer ID:", customerId); // Debugging line
            const customerFound=await CustomerModel.findById(customerId).populate('cart.productId')

            const cart=customerFound.cart.map((item)=>({
                id:item.productId._id.toString(),
                title:item.productId.title,
                price:item.productId.price,
                Category:item.productId.category,
                Image:item.productId.imageUrl,
                quantity:item.quantity
            }));
            return res.status(200).json({
                success:true,
                status:200,
                message:"Cart fetched successfully",
                data:cart
            });
        }
        catch(err){
            return res.status(500).json({
                success:false,
                status:500,
                message:"Internal server error",
                error:err.message
            })
        }
    },
    updateQuantityInCart:async(req,res)=>{
        try{
            const {customerId, cartData}=req.body;
            console.log('cartData',cartData)
            if(!customerId || !cartData){
                return res.status(400).json({
                    success:false,
                    status:400,
                    message:"All fields are required"
                });
            }
            const customerFound=await CustomerModel.findById(customerId).populate('cart.productId');
            if(!customerFound){
                return res.status(404).json({
                    success:false,
                    status:404,
                    message:"Customer not found"
                });
            }


            const updatedCart=customerFound.cart.map(item=>{
                const matchingItem=cartData.find(cartItem=>cartItem.id===item.productId._id.toString());
                if(matchingItem){
                    item.quantity=matchingItem.quantity;
                }
                return item;
            });
            console.log("Updated Cart:", updatedCart);
            customerFound.cart=updatedCart;
            await customerFound.save();
            const lineitems=customerFound.cart.map(item=>({
                price_data:{
                    currency:'inr',
                    product_data:{
                        name:item.productId.title,
                        images:[item.productId.imageUrl]
                    },
                    unit_amount:item.productId.price * 100,
                },
                quantity:item.quantity
            }));
console.log("🛒 Line Items for Stripe:", JSON.stringify(lineitems, null, 2));
            const session=await stripe.checkout.sessions.create({
                payment_method_types:['card'],
                line_items: lineitems,
                mode:'payment',
                success_url:'http://localhost:3000/payment/success',
                cancel_url:'http://localhost:3000/payment/failed'
            })
            return res.status(200).json({
                success:true,
                status:200,
                sessionUrl:session.url,
                message:"Proceeded to payment",
                data:customerFound
            });
        }
        catch(err){
            return res.status(500).json({
                success:false,
                status:500,
                message:"Internal server error",
                error:err.message
            });
        }
    },
    removeFromCart:async(req,res)=>{
        try{
            const {customerId, productId}=req.body;
            if(!customerId || !productId){
                return res.status(400).json({
                    success:false,
                    status:400,
                    message:"All fields are required",
                });
            }
            const customerFound=await CustomerModel.findById(customerId);
            if(!customerFound){
                return res.status(404).json({
                    success:false,
                    status:404,
                    message:"Customer not found"
                });
            }
            const updatedCart=customerFound.cart.filter(item=>item.productId.toString()!==productId);
            customerFound.cart=updatedCart;
            await customerFound.save();
            return res.status(200).json({
                success:true,
                status:200,
                message:"Product removed from cart successfully",
                data:customerFound
            });
        }
    
    catch(err){
        return res.status(500).json({
            success:false,
            status:500,
            message:"Internal server error",
            error:err.message
        });
    }
},
addToMyOrders:async(req,res)=>{
    try{
        const {customerId}=req.body
        if(!customerId){
            return res.status(400).json({
                success:false,
                status:400,
                message:"CustomerId is missing",
            });
        }
        const customerFound=await CustomerModel.findById(customerId);
        if (!customerFound){
            return res.status(401).json({
                success:false,
                status:401,
                message:'Customer not Found'
            })
        }
        if (!customerFound.MyOrders) {
      customerFound.MyOrders = [];
    }
    customerFound.MyOrders.push(...customerFound.cart);


        customerFound.cart=[];
        await customerFound.save();
        return res.status(201).json({
            success:true,
            status:201,
            message:'Order placed and cart cleared',
            data:customerFound
        })
    }
    catch(error){
        return res.status(400).json({
            success:false,
            status:400,
            message:"Internal server error",
            error:error.message
        })
    }
},
myOrders:async(req,res)=>{
    try{
        const {customerId}=req.body
        if(!customerId){
            return res.status(400).json({
                success:false,
                status:400,
                message:"CustomerId is missing",
            });
        }
        const customerFound=await CustomerModel.findById(customerId).populate('MyOrders.productId');
        const result=customerFound.MyOrders
        return res.status(201).json({
            success:true,
            status:201,
            data:result,
            message:"MyOrders fetched successfully"
        })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            status:500,
            message:"Internal server error",
            error:error
        })
    }
}
}