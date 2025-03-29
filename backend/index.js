require("dotenv").config();

const express = require('express');
const urlRoute = require('./routes/url.route')
const cors = require('cors') // to connect frontend
const { connectDB } = require('./connect')

const app = express();
const PORT = process.env.PORT;

connectDB(process.env.MONGO_URL)
    .then(() => console.log("mongodb connected"))
    .catch((err) => console.log(err))

//middleware
app.use(express.json())
app.use(cors()) // to  connect frontend

//routes
app.use("/", urlRoute)



app.listen(PORT, () => console.log(`app is listening on PORT : ${PORT}`))