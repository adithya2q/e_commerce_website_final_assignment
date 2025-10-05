import React, { useEffect, useState } from 'react'
import { orderHistory } from '../apiUtils/userApi';
import Cards from '../Cards';
import { Container } from 'react-bootstrap';

const MyOrders = () => {
const [orders,setOrders]=useState([])

        useEffect(()=>{
        const myOrders=async()=>{
        const customerId=JSON.parse(localStorage.getItem('@customer'));
        console.log('Customer ID from localStorage:', customerId);
        if(!customerId){
            return;
        }
        try{
            const response=await orderHistory({customerId});
            setOrders(response.data)
            console.log('order history',response.data)
        }
        catch(error){
            console.error("Error loading Order History",error);
        }
            }
            myOrders();
        },[])
  return (
    <Container>
    <div>
        <h1 className='text-center'>My Orders</h1>
            <div className='mt-5 d-flex flex-wrap gap-2'>
        {orders.map((item,index)=>(
          <Cards 
          key={index}
          title={item?.productId.title}
          price={` ${item?.productId?.price}/piece`}
          Category={item?.productId.category}
          Image={item?.productId.imageUrl}
          Quantity={item?.quantity}
          orderedAt={item?.createdAt}
           />
        ))}
        
      </div>
      
    </div>
    </Container>
  )
}

export default MyOrders
