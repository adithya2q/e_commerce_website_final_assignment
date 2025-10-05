import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../slices/counterSlice';
import cartReducer from '../slices/cartSlice';




const reduxStore= configureStore({
    reducer:{
        counter:counterReducer,
        cart:cartReducer,
    },
    devTools: true,
    // +  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()



});

export default reduxStore;