import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../slices/cartSlice';
import { addProductToCart } from '../apiUtils/userApi';
import { toast } from 'react-toastify';


const Cards = ({id,title,price,Category,Image,Quantity,orderedAt}) => {
  const dispatch = useDispatch();



  const handleAddToCart =async () => {
    const product = {
      id,
      title,
      price,
      Category,
      Image,
    };
    const customerId=JSON.parse(localStorage.getItem('@customer'));
    if (customerId) {
      // User is logged in, proceed to add the product to the cart
      dispatch(addProduct(product));
      const response=await addProductToCart({customerId, product});
           console.log("Saved to DB:", response);
    } else {
      // User is not logged in, show an alert or redirect to login page
      toast('Please log in to add products to your cart.');
    }
  };
  

  return (
    <div>
    <Card className='card h-70' style={{ 
        width: '18rem',
        margin:'1rem',
        marginTop:'1rem'
 }}>
      <Card.Img variant="top" src={Image} alt='Product image' style={{ height: '250px', objectFit: 'cover', width: '100%' }}
/>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
            Price:{price}
            </Card.Text>
            <Card.Text>
            Category:{Category}
            </Card.Text>
            {Quantity ? (
              <Card.Text>
                Quantity: {Quantity}
              </Card.Text>
            ) : null}
            {orderedAt && (
            <Card.Text>
               Ordered on: {new Date(orderedAt).toLocaleString()}
              </Card.Text>
            )}
            <Button variant="warning" onClick={handleAddToCart} style={{display: 'flex', marginTop:'10px'}} >Add to Cart</Button>

      </Card.Body>
    </Card>


    </div>
  )
}

export default Cards
