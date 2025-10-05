import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


const cartSlice=createSlice({
    name:'cart',
    initialState: {
        value:[],
    },
    reducers :{
        clearCart:state=>{
            state.value=[];
        },
        setCart:(state,action)=>{
            state.value=action.payload;
        },
        addProduct: (state, action) => {
            const { id, title, price, Category, Image } = action.payload;
      
            const existingProduct = state.value.find(
              (product) => product.id === id
            );
      
            if (existingProduct) {
              toast(`${title} quantity has already been added.`);
            } else {
              state.value.push({
                id,
                title,
                price,
                Category,
                Image,
              });
              toast(`${title} has been added to the cart.`);
            }
          },
          removeProduct: (state, action) => {
            const id = action.payload;
            state.value = state.value.filter((product) => product.id !== id); // Filter out the product by id
          },
    }
})

export const {clearCart,setCart,addProduct,removeProduct} = cartSlice.actions;

export default cartSlice.reducer;