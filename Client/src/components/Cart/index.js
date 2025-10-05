import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Counter from '../Counter'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCart } from '../slices/cartSlice';
import { addProduct, removeProduct } from '../slices/cartSlice';
import { getCart, removeProductInCart, updateQuantityInCart } from '../apiUtils/userApi';
import { setQuantities } from '../slices/counterSlice';
import {loadStripe} from '@stripe/stripe-js';
import { Container } from 'react-bootstrap';
import { toast } from 'react-toastify';

const stripePromise=loadStripe('pk_test_51SDTPT38gR93COvprVd3bdTgaRGov9VS7treOQaElqz4acnjJqHsnbjoEu7NgzpxOcTUZPj7WbPjTRivcv6SGdRM00tGcHJAPs')

const Cart = () => {
  const cartItems= useSelector((state) => state.cart.value);
  const quantities = useSelector((state) => state.counter.cart);
  const navigate = useNavigate(); 
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce((total, product) => {
    const quantity = quantities[product.id] || 0;
    return total + product.price * quantity;
  }, 0);

  useEffect(()=>{
    const loadCartFromDB=async()=>{
      const customerId=JSON.parse(localStorage.getItem('@customer'));
      console.log('Customer ID from localStorage:', customerId);
      if(!customerId){
        return;
      }
      try{
        const response=await getCart({customerId});
        if(response && response.success){
          dispatch(setCart(response.data))
          const quantitiesFromDB = {};
          response.data.forEach(item => {
          quantitiesFromDB[item.id] = item.quantity;
        });
        dispatch(setQuantities(quantitiesFromDB));
        
        }

      }
      catch(error){
        console.error("Error loading cart from DB:", error);
    }
  }
  loadCartFromDB();
},[])

 

const handleCheckOut = async () => {
  const customerId = JSON.parse(localStorage.getItem('@customer'));
  console.log('Customer ID:', customerId);
  if (!customerId) {
    toast('Please log in to save your cart.');
    return;
  }
  const cartData = cartItems.map((item) => ({
    id: item.id,
    quantity: quantities[item.id] || 0,
  }));
  console.log('Cart Data to be sent:', cartData);
  try{
    const response=await updateQuantityInCart({customerId,cartData});
    console.log('Response from server:', response);
    if (response && response.success){
      console.log("resposne",response);
      const stripe=await stripePromise;
      if (stripe){
        window.location.href=response.sessionUrl;

      }
      else{
        toast('Stripe.js has not loaded yet. Please try again later.');
      }
      toast('Cart saved successfully!');
    }
  }
  catch(error){
    console.error('Error saving cart to DB:', error);
    toast('Failed to save cart. Please try again.');
}
};


  const handleViewProduct = (id) => {
    navigate(`/ProductDetails/${id}`);
  };

  const handleRemoveProduct = (id) => {
    try{

      dispatch(removeProduct(id));
      const customerId = JSON.parse(localStorage.getItem('@customer'));
      if (customerId) {
        removeProductInCart({ customerId, productId: id });
      }
    }
    catch(error){
      console.error('Error removing product from cart:', error);
  }
}
  return (
    <Container>
    <div>
      <h1 className='d-flex justify-content-center align-items-center'>Cart</h1>
      {cartItems.length===0 ?(<h1 className='d-flex justify-content-center align-items-center vh-100'>Cart is empty</h1>):(<>
      <div className='row'>
      {cartItems.map((product)=>(
   <Card className='card h-70 col-sm-12 col-md-6 col-lg-4' style={{ 
    width: '18rem',
    margin:'1rem',
    marginTop:'1rem'
}}>
  <Card.Img variant="top" src={product.Image} alt='Product image'
/>
  <Card.Body>
    <Card.Title>{product.title}</Card.Title>
    <Card.Text>
        Price:Rs{product.price}
        </Card.Text>
        <Card.Text>
        Category:{product.Category}

        </Card.Text>
        <Button variant="primary" onClick={() => handleViewProduct(product.id)}>
                View Product
              </Button>
        <div><Counter pricePerItem={product?.price}
        productId={product?.id} 
        /></div>
        <Button variant="danger" onClick={() => handleRemoveProduct(product.id)}>
                Remove from Cart
              </Button>

  </Card.Body>
</Card>

        ))}

      </div>
      <h3>Total Price:{totalPrice}</h3>
      <button className='btn btn-success' onClick={handleCheckOut}>Check Out </button>
      </>
      )};
    </div>
    </Container>
  )
}

export default Cart
