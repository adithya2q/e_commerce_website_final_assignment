import React from 'react'

const About = () => {
  return (
    <div className='d-flex justify-content-center align-items-center vh-100' style={{
      backgroundImage:"url('https://img.freepik.com/premium-vector/online-shopping-digital-technology-with-icon-blue-background-ecommerce-online-store-marketing_252172-219.jpg')",
      minHeight:'100vh',
      backgroundRepeat:'no-repeat',
      backgroundSize:'100% 100%',
      color:'white',
    }}>
      <p className='mx-5'>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
       Lorem Ipsum has been the industry's standard dummy text ever since
       the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
       It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
       It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and 
      more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
</p>
    </div>
  )
}

export default About
