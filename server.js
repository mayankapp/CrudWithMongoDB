const express = require('express');
const app = express();
app.use(express.json());

// Database Configuration
const db = require('./mongoDB/dbcon');
const userController = require('./controllers/userController');

app.get('/',userController);
app.post('/user/create', userController);
app.get('/singaluser/:id', userController);
app.patch('/user/update/:id', userController);
app.delete('/user/delete/:id', userController);

app.listen(3000,async () => {
    try {
        await db.connectToServer();
        console.log("Connection sucessfully ")
    } catch (error) {
        console.log("Connection Denied")
    }
    console.log("Port running on 3000")
})


