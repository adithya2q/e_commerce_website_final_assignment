
import Cards from '../Cards';
import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { importProducts } from '../apiUtils/userApi';
import { Container } from 'react-bootstrap';
const Home= () => {

const {searchQuery} = useOutletContext(); 
const [products, setProducts]=useState([]);

useEffect(()=>{
  const fetchProducts=async()=>{
    const response=await importProducts();
    console.log(response);
    if (response && response.success){
      setProducts(response.data);
    }
  }
  fetchProducts();
},[])

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) // Filter by name
  );
  return (
    <div>
 <Container>
      <h1 className='text-center'>Product List</h1>
    <div className='mt-5 d-flex flex-wrap gap-2'>
        {filteredProducts.map((product)=>(
          <Cards 
          key={product?._id}
          id={product?._id}
          title={product?.title}
          price={product?.price}
          Category={product?.category}
          Image={product?.imageUrl}
           />
        ))}
        
      </div>
    
</Container>
</div>
  )
}

export default Home
