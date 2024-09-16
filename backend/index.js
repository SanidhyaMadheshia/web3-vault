const express = require('express');
const app = express()
const cors = require('cors')
const {MONGODB_URL,PORT}=require('./config/serverConfig')
const {connectDB}=require('./db/connect')
const authenticationRoute=require('./routes/authenticationRoute')
const uploadImageRoute=require('./routes/uploadImageRoute')
const getImageRoute=require('./routes/getImageRoute')

const corsOptions = {
    origin: 'https://web3-vault-front.vercel.app/',  // Only allow this domain
    methods: 'GET, POST, PUT, DELETE',  // Allowed methods
    allowedHeaders: 'Content-Type, Authorization',  // Allowed headers
    credentials: true  // Allow credentials (cookies, tokens, etc.)
  }


// app.use(cors(corsOption))
app.options('*', cors(corsOptions)); // Enable pre-flight requests for all routes

app.use(express.json())

app.use('/api',authenticationRoute)

app.use('/api',uploadImageRoute)
app.use('/api',getImageRoute)

app.get('/', (req ,res)=> {
    res.send('<h1> hi </h1>');
})


async function serverStart(){

    try {
        await connectDB(MONGODB_URL)
        console.log("Connected to database")
        app.listen(PORT,()=>{
            console.log("server is running")
        }) 
    } catch (error) {
        console.log(error)
    }
}

serverStart()
