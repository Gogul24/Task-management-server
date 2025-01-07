const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const taskRoutes = require('./routes')

const app = express();
app.use(cors())
app.use(express.json())
dotenv.config()

const port = process.env.PORT;
const url = process.env.MONGOURL;

app.use('/api',taskRoutes)

mongoose.connect(url)
.then(()=>{
    console.log(`DB connected Successfully`); 
})

app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);    
})