const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')



const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error')

mongoose.set('strictQuery', true);
const app = express();

app.use(bodyParser.json())

app.use(('/api/places'), placesRoutes);

app.use(('/api/users'), usersRoutes );

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
})

app.use((error, req, res, next) => {
    if(res.HeaderSent){
        return next(error);
    }
    res.status(error.code || 500)
    res.json({message: error.message || "An unknown error occur. "})
})



mongoose
    .connect('mongodb+srv://rezzan:1223456@cluster0.xc6rxke.mongodb.net/places?retryWrites=true&w=majority')
    .then(()=>{
        app.listen(3000);
    })
    .catch((err)=>{
        console.log(err)
    });