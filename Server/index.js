const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const app = express();
const cors = require('cors')
const TodoItemRoute = require('./routes/todoItem');

app.use(express.json());

const mongoURI = 'mongodb+srv://godvinfebi2002:godvin123@cluster0.uvm3oyv.mongodb.net/?retryWrites=true&w=majority';
app.use(cors())
async function connectToMongo() {
    try {
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB with Mongoose');
        return mongoose.connection;
    } catch (error) {
        console.error('Error connecting to MongoDB with Mongoose:', error);
        throw error;
    }
}

async function startServer() {
    try {
        const mongooseConnection = await connectToMongo();
        app.listen(4000, () => console.log('Server connected on port 5500'));
    } catch (error) {
        console.error('Error starting server:', error);
    }
}

startServer();

app.use('/', TodoItemRoute);
