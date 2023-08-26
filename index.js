const express=require('express');
const app=express();
const userRoutes=require('./routes/user');
const authRoutes=require('./routes/auth');
const productRoutes=require('./routes/product');
const cartRoutes=require('./routes/cart');
const orderRoutes=require('./routes/order');
const mongoose=require('mongoose');
const cookie=require('cookie-parser');
const dotenv=require('dotenv');

dotenv.config();
app.use(express.json());
app.use(cookie());
app.use('/user',(userRoutes));
app.use('/user',(authRoutes));
app.use('/product',(productRoutes));
app.use('/cart',(cartRoutes));
app.use('/order',(orderRoutes));

mongoose.connect(process.env.MONGO,
{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log("db is connected");
})
.catch((e)=>{
    console.log(e);
    console.log("error");
})

const port=process.env.PORT;
app.listen(port,()=>{
    console.log("listening 8000")
});