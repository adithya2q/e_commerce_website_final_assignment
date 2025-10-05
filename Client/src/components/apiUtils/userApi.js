import axiosInstance from "../config/axiosconfig";

export const userLogin=async(payload)=>{
    const {email,password,role}=payload;
    if(email&&password&&role){
        const result=await axiosInstance.post('login',payload);
        console.log(result); // <-- Add this
        return result.data
    }
    else{
        return false;
    }
}

export const userRegister=async(payload)=>{
    const{name, email,phone, password, confirmPassword}=payload;
    if (name && email && phone && password && confirmPassword){
        const result=await axiosInstance.post('register',payload);
        return result.data;
    }
    else{
        return false;
    }
}

export const addProductToCart=async(payload)=>{
    const {customerId, product}=payload;
    console.log("Adding to cart:", customerId, product);
    if(customerId && product){
        const result=await axiosInstance.post('add/cart',{customerId, product});
        return result.data;
    }
    else{
        return false;
    }
}

export const getCart=async(customerId)=>{
    try{
        if(customerId){
            const result=await axiosInstance.post('get/cart',customerId);
            return result.data;
        }
        else{
            return false;
        }
    }
    catch(err){
        console.error("Error fetching cart:", err);
        return false;
}
}


export const updateQuantityInCart=async(payload)=>{
    const {customerId, cartData}=payload;
    console.log(cartData)
    if(customerId && cartData){
        const result=await axiosInstance.put('update/cart',{customerId, cartData});
        return result.data;
    }
    else{
        return false;
    }
}

export const removeProductInCart=async(payload)=>{
    const {customerId, productId}=payload;
    if(customerId && productId){
        const result=await axiosInstance.put('remove/cart',{customerId, productId});
        return result.data;
    }
    else{
        return false;
    }
}

export const importProducts=async()=>{
    const result=await axiosInstance.get('get/products');
    console.log(result);
    return result.data;
}

export const orderSuccessApi=async(payload)=>{
    const {customerId}=payload
    if(customerId){
        const result=await axiosInstance.post('add/orders',{customerId})
        return result.data;
    }
}


export const orderHistory=async(payload)=>{
    const {customerId}=payload
        if(customerId){
        const result=await axiosInstance.post('myorders',{customerId})
        return result.data;
    }
}