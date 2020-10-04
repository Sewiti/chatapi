const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

const app = express();
const port = process.env.PORT || 8000;


// Database
mongoose.connect(
    process.env.DB_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    },
    (err) => {
        if (err) console.log({ mongodb: err });
    }
);


// Middlewares
app.use(bodyParser.json());


// Routes
app.use('/account',  require('./src/routes/account'));
app.use('/login',    require('./src/routes/login'));
app.use('/register', require('./src/routes/register'));


// Listen
app.listen(port, () => { console.log(`Listening on port ${port}...`) });
