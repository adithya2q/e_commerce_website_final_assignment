import { createSlice } from "@reduxjs/toolkit";


const counterSlice=createSlice({
    name:'counter',
    initialState: {
        cart:{},
    },
    reducers :{
        increment: (state, action) => {
          const { productId,value } = action.payload;
          if (state.cart[productId]) {
            // If decrement, ensure that quantity doesn't go below 0
            if (value < 0 && state.cart[productId] > 0) {
              state.cart[productId] += value;
            } else if (value > 0) {
              state.cart[productId] += value;
            }
          } else if (value > 0) {
            // If the product does not exist and we're incrementing, add it to the cart
            state.cart[productId] = value;
          }
        },
        reset: (state,action) => {
          const productId = action.payload;
          if (state.cart[productId]) {
            state.cart[productId]=0; // reset the quantity of the specific product
          }
          else{
          state.cart = {}; // Reset all product quantities
        }
        },
        setQuantities: (state, action) => {
          state.cart = action.payload;
        }
    }
})

export const {increment,
decrement,
reset,setQuantities} = counterSlice.actions;

export default counterSlice.reducer;