const express = require('express');
const connectDB = require('./db/db');
const app = express();
require('colors');
require('dotenv').config();

// middlewares //
connectDB();
app.use(express.json());

// routers //
const userRouter = require('./routes/userRoute');

// routes //
app.use('/',userRouter);


const PORT = process.env.PORT || 5000;


app.listen(5000, () => {
    console.log(`App is listening on PORT ${PORT} IN ${process.env.NODE_ENV} Environment`.blue.bold);
});




