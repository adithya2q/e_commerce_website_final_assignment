const express=require('express');
const app=express();
const cors=require('cors');
require('dotenv').config();



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());


dbconfig=require('./dbconfig/index.js');
const router=require('./routes');
app.use('',router);



const PORT=process.env.PORT;
app.get('/', (req, res) => {
  res.status(200).send('E commerce website is running');
});
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});



