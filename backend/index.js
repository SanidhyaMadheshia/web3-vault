const express = require('express');
const cors = require('cors');
const { MONGODB_URL, PORT } = require('./config/serverConfig');
const { connectDB } = require('./db/connect');
const authenticationRoute = require('./routes/authenticationRoute');
const uploadImageRoute = require('./routes/uploadImageRoute');
const getImageRoute = require('./routes/getImageRoute');

const app = express();

// CORS options to allow all origins
const corsOptions = {
    origin: '*',  // Allow all origins
    methods: 'GET, POST, PUT, DELETE',  // Allowed methods
    allowedHeaders: 'Content-Type, Authorization',  // Allowed headers
    credentials: true  // Allow credentials (cookies, tokens, etc.)
};

app.use(cors(corsOptions));  // Apply CORS middleware globally

app.use(express.json());

app.use('/api', authenticationRoute);
app.use('/api', uploadImageRoute);
app.use('/api', getImageRoute);

app.get('/', (req, res) => {
    res.send('<h1> hi </h1>');
});

async function serverStart() {
    try {
        await connectDB(MONGODB_URL);
        console.log("Connected to database");
        app.listen(PORT, () => {
            console.log("Server is running");
        });
    } catch (error) {
        console.log(error);
    }
}

serverStart();
