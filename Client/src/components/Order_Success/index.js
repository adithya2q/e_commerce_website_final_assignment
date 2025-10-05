import React from 'react'
import { useEffect } from 'react'
import { Button} from 'react-bootstrap'
import { orderSuccessApi } from '../apiUtils/userApi'
import { NavLink } from 'react-router-dom'

const Order_Success = () => {
    useEffect(()=>{
    const orderSuccess=async()=>{
    const customerId=JSON.parse(localStorage.getItem('@customer'));
    console.log('Customer ID from localStorage:', customerId);
    if(!customerId){
        return;
    }
    try{
        const response=await orderSuccessApi({customerId});
    }
    catch(error){
        console.error("Error loading Order History",error);
    }
        }
        orderSuccess();
    },[])
  return (
    <div>
        <div className='d-flex flex-column justify-content-center align-items-center vh-100'><h1>Order placed successfully</h1>
      <NavLink to="/myorders"> <Button >My Orders</Button></NavLink> 
      </div>
    </div>
  )
}

export default Order_Success
