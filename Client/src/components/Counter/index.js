import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {increment,
  reset} from '../slices/counterSlice';
  import Button from 'react-bootstrap/Button';

  

const Counter = ({pricePerItem,productId}) => {

    const count=useSelector((state)=>
      {
        console.log("state",state);
        console.log("state.counter.value",state.counter.cart[productId]);
        return state.counter.cart[productId] || 0;
      });


      const dispatch = useDispatch(); 
      const totalPrice = Math.max(count * pricePerItem, 0);



    const handleClick = (value) => {
        console.log("action value:", value);
        dispatch(increment({ productId, value }));

    }

    const handleReset = () => {
        console.log("handle reset clicked");
        dispatch(reset(productId));

    }
  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      </div>
      
      <div style={{display: 'flex', marginTop:'10px'}}>
        <Button variant='success' onClick={() => handleClick(1)}>+</Button>
        <p>{count}</p>
        <Button variant='warning'
        style={{marginLeft: '10px'}}
        onClick={() => handleClick(-1)}>-</Button></div>
<div>
<Button  style={{display: 'flex', marginTop:'10px'}} variant='danger' onClick={ handleReset}>Reset</Button>
      </div>
      <h3>Total Price:{totalPrice}</h3>

    </div>

  )
}
export default Counter;
