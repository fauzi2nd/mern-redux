'use strict';

const colors = require('colors');
const cors = require('cors');
const dotenv = require('dotenv').config();
const express = require('express');
const path = require('path');

const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const UserRoute = require('./routes/userRoute');
const AuthRoute = require('./routes/authRoute');

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
    cors({
        credentials: true,
        origin: '*'
    })
);

app.use('/api/', AuthRoute);
app.use('/api/users', UserRoute);

// Serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    app.get('*', (req, res) =>
        res.sendFile(
            path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
        )
    );
} else {
    app.get('/', (req, res) => res.send('Please set to production'));
}


app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});