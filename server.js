/////DEPENDENCIES
//get.env variables
require('dotenv').config();
// pull PORT from .env, give default value of 4000
const { PORT = 4000, MONGODB_URL } = process.env;
// import express
const express = require('express');
// create application object
const app = express();
//import mongoose
const mongoose = require('mongoose');
//import middleware
const cors = require('cors');
const morgan = require('morgan'); //logging
app.use(express.json()); //parse json bodies

/////DATABASE CONNECTION
mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

//connection events
mongoose.connection
    .on('open', () => console.log('You are connected to mongoose'))
    .on('close', () => console.log('You are disconnected from mongoose'))
    .on('error', (error) => console.log(error));

/////MODELS
const CheeseSchema = new mongoose.Schema({
    name: String,
    countryOfOrigin: String,
    image: String
});

const Cheese = mongoose.model('Cheese', CheeseSchema)

/////ROUTES
// test
app.get('/', (req, res) => {
    res.send('Testing, hello world');
});

//CHEESE INDEX ROUTE
app.get('/cheese', async (req, res) => {
    try {
        //send all people
        res.json(await Cheese.find({}));
    } catch (error) {
        res.status(400).json(error);
    }
});


//CHEESE DELETE ROUTE
app.delete('/cheese/:id', async (req, res) => {
    try {
        //send all people
        res.json(await Cheese.findByIdAndRemove({}));
    } catch (error) {
        res.status(400).json(error);
    }
});

//CHEESE UPDATE ROUTE
app.post('/cheese/:id', async (req, res) => {
    try {
        //send all people
        res.json(await Cheese.findByIdAndUpdate({}));
    } catch (error) {
        res.status(400).json(error);
    }
});

//CHEESE CREATE ROUTE
app.post('/cheese', async (req, res) => {
    try {
        //send all cheese
        res.json(await Cheese.create(req.body));
    } catch (error) {
        res.status(400).json(error);
    }
});

/////LISTENER
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
