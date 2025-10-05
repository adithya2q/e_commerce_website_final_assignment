import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const Layout = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const cartItems = useSelector((state) => state.cart.value);
  const navigate=useNavigate();
  const token = localStorage.getItem("@token"); 
const handleSignOut=()=>{
    localStorage.removeItem('@token');
    navigate("/login")
}

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    alert(`Search query: ${searchQuery}`);
  };
  return (
    <div>

      <Navbar bg='primary' expand="lg" data-bs-theme="dark">
      <h1>Company</h1>
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to='/' >Home</Nav.Link>
            <Nav.Link as={NavLink} to='/about'>About</Nav.Link>
            <Nav.Link as={NavLink} to='/cart' >Cart({cartItems.length})</Nav.Link>
            <Nav.Link as={NavLink} to='/myorders'>My Orders</Nav.Link>

           
       </Nav>
       <Form className="d-flex" onSubmit={handleSearchSubmit}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <Button variant="outline-light" type="submit">
                Search
              </Button>
            </Form>
        <Navbar.Collapse className="justify-content-end">
                {token && (
          <Navbar.Text className='me-3'>
        <Button onClick={handleSignOut} variant="outline-danger" className='ms-3'>
          Sign Out
        </Button>
      </Navbar.Text>  
      )}
        </Navbar.Collapse>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Outlet  context={{ searchQuery }} ></Outlet>
    </div>
  )
}

export default Layout
