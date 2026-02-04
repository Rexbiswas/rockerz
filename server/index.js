const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoute = require('./routes/auth');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Route Middlewares
app.use('/api/auth', authRoute);

// Connect to DB and Start Server
const clientOptions = {
    serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
    }
};

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/rokerzBD', clientOptions)
    .then(() => {
        console.log('Connected to MongoDB');
        global.useMongoDB = true;
        app.listen(PORT, () => console.log(`Server Up and Running on port ${PORT} (MongoDB Mode)`));
    })
    .catch((err) => {
        console.log('⚠ MongoDB Connection Failed:', err.message);
        console.log('⚠ Switching to Local JSON File Mode');
        global.useMongoDB = false;
        app.listen(PORT, () => console.log(`Server Up and Running on port ${PORT} (JSON Fallback Mode)`));
    });

// Basic Route
app.get('/', (req, res) => {
    res.send('Rokerz Server is Running');
});
