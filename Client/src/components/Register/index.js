import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { userRegister } from '../apiUtils/userApi';
import { useNavigate } from 'react-router-dom';

const Register= () => {
    const navigate=useNavigate();

    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [phone,setPhone]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');

    const isValid=()=>{
        if (name && name.trim().length>0 && email && email.trim().length>0&& phone && phone.trim().length>0 && password && password.trim().length>0&& confirmPassword && confirmPassword.trim().length>0 && password===confirmPassword) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^\d{10}$/;
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return emailPattern.test(email) && phonePattern.test(phone) && passwordPattern.test(password);
    }
    else{
        toast('Password and confirm password do not match');
        return false;
    }
}

const handleSubmit=async(event)=>{
    event.preventDefault();
    setName(name.trim());
    setEmail(email.trim());
    setPhone(phone.trim());
    setPassword(password.trim());
    setConfirmPassword(confirmPassword.trim());
    if (isValid()) {
       const resposne=await userRegister({name,email,phone,password,confirmPassword});
       if (resposne && resposne.success){
        toast('Registration successful');
        navigate('/login');
       }
       else{
        toast('Registration failed');
       }
    }
}

  return (
       <Container>
    <div style={{backgroundImage: 'url(https://media.istockphoto.com/id/1247569904/vector/arrows-light-blue-abstract-futuristic-speed-on-black-background-vector-illustration.jpg?s=612x612&w=0&k=20&c=FsTw_Yq6QkfYQems8ysJtzE8kbMAR3x1_dv7TrwBqdI=)', minHeight:'100vh', backgroundRepeat:'no-repeat', backgroundSize:'cover'}}>
 
        <Row>
      <Col md={6} className="mx-auto">
    <div  style={{backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTimkSPl3KJabcGSGIsN3eFkK2jGMHk_1_yQ2fG9z_thTB1K7sklKBrYpr76fq3OKs44w&usqp=CAUl)', padding:'20px', borderRadius:'10px', backgroundRepeat:'no-repeat', backgroundSize:'cover', marginTop:'20px'}}>
        <h1 className='text-white'>Register Page</h1>  
        <Form>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label className='text-white'>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" onChange={(e) => setName(e.target.value)} />
      </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className='text-white'>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
      </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPhone">
        <Form.Label className='text-white'>Phone</Form.Label>
        <Form.Control type="number" placeholder="Enter phone number" onChange={(e) => setPhone(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className='text-white'>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
        <Form.Label className='text-white'>Confirm password</Form.Label>
        <Form.Control type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />
      </Form.Group>


      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" className='text-white' label="I confirm the above details" />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
    </div>
    </Col>
    </Row>

    </div>
   </Container>

  )
}

export default Register
