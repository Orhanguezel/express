const express = require('express');
const users =[
    {id:1, name:'John'},
    {id:2, name:'Peter'},
    {id:3, name:'Mary'}
];

const app = express();

const PORT = 5005;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});


