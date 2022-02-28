require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()
const port = process.env.PORT || 3000

const db = require('./config/db')
const apiRoutes = require('./routes/index')

/**
 * App config
 */
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use('/api', apiRoutes);
app.all('/' , (req , res)=> res.send({status: true, msg: "User menage."}))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))