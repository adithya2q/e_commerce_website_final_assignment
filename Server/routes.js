const router=require('express').Router();
const { Login, Register } = require('./controllers/login&registercontroller');
const { getProducts, addProductToCart, updateQuantityInCart, getCart, removeFromCart, addToMyOrders, myOrders } = require('./controllers/customercontroller');
const { authmiddleware} = require('./Middlewares/authMiddleware');
const { addProducts, updateProduct, deleteProduct } = require('./controllers/usercontroller');
const {adminMiddleware} = require('./Middlewares/adminMiddleware');




router.post('/login',Login);
router.post('/register',Register);
router.get('/get/products',authmiddleware,getProducts);
router.post('/add/products',authmiddleware,adminMiddleware,addProducts);
router.put('/update/products',authmiddleware,adminMiddleware,updateProduct);
router.post('delete/products',authmiddleware,adminMiddleware,deleteProduct)
router.post('/add/cart',authmiddleware,addProductToCart);
router.put('/update/cart',authmiddleware,updateQuantityInCart);
router.post('/get/cart',authmiddleware,getCart);
router.put('/remove/cart',authmiddleware,removeFromCart);
router.post('/add/orders',authmiddleware,addToMyOrders);
router.post('/myorders',authmiddleware,myOrders)


module.exports=router;
