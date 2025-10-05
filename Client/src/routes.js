import React from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Cart from './components/Cart';
import Layout from './components/Layout';
import LoginPage from './components/Login';
import Register from './components/Register';
import Order_Success from './components/Order_Success';
import MyOrders from './components/MyOrders';

const isAuthenticated=()=>{
  const token=localStorage.getItem('@token');
  const user=localStorage.getItem('@customer');
  if(token && user){
    return true;
  }
  return false;
}


const ProtectedRoute=({element})=>{
  return isAuthenticated()? element : <Navigate to="/login" />;
}

const FallbackRoute=({element})=>{
  return isAuthenticated()? <Navigate to="/" /> : <Navigate to="/login" />;
}

const router=createBrowserRouter([
{
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <ProtectedRoute element={<Home />} /> },
      { path: "about", element: <ProtectedRoute element={<About />} /> },
      { path: "cart", element: <ProtectedRoute element={<Cart />} /> },
      { path: "myorders", element: <ProtectedRoute element={<MyOrders />} /> },
    ],
  },
  {
    path:'/login',
    element:<LoginPage />
  },
  {
    path:'/register',
    element:<Register />
  },
  {
    path:'/payment/success',
    element:<Order_Success />
  },
  {
    path:'/payment/failed',
    element:<h1>payment failed</h1>
  },
  {
    path:'/myorders',
    element:<MyOrders />
  },  
  {
    path:'*',
    element:<FallbackRoute/>
  }
])

export default router;
