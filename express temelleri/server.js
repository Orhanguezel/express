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

app.use(express.json());

app.get('/users',accessControl, (req, res, next) => {
    res.json({
        success: true,
        data: users
    });
});

// Get Request
// localhost:5005/users

app.post('/users', (req, res, next) => {
const user = req.body;
users.push(user);
    res.json({
        success: true,
        data: users
    })
});


app.put('/users/:id', (req, res, next) => {
    const userId = req.params.id;
    const user = users.find(u => u.id === parseInt(userId));

    if (!user) {
        res.status(404).json({ error: 'Kullanıcı bulunamadı!' });
        next(); // HATA: Yanıt gönderildikten sonra next() çağrılıyor
        return;
    }

    user.name = req.body.name;
    res.json(user);
    next(); // HATA: Yanıt tekrar gönderilmeye çalışılıyor
});


app.delete('/users/:id', (req, res, next) => {
    const id = req.params.id;
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === parseInt(id)) {
            users.splice(i, 1);
        }
    }
    res.json({
        success: true,
        message: 'Delete request'
    })
});



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});


