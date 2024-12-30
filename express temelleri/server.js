const express = require('express');
const accessControl = require('./middleware.js');

const users =[
    {id:1, name:'John'},
    {id:2, name:'Peter'},
    {id:3, name:'Mary'}
];

const app = express();

const PORT = 5001;
//app.use(accessControl);

app.get('/users',accessControl, (req, res, next) => {
    res.json(users);
});

// Get Request
// localhost:5005/users

app.get('/products',(req,res,next)=>{
    res.json("Products");
});



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});


