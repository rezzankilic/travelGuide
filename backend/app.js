const express = require('express');
const bodyParser = require('body-parser');

const placesRoutes = require('./routes/places-routes');
const usersRouters = require('./routes/users-routes')

const app = express();

app.use(('/api/places'), placesRoutes);

app.use(('/api/users'), usersRouters );

app.use((error, req, res, next) => {
    if(res.HeaderSent){
        return next(error);
    }
    res.status(error.code || 500)
    res.json({message: error.message || "An unknown error occur. "})
})

app.listen(3000);