require('dotenv').config()

const configViewEngine = require('./src/config/viewEngine')
const express = require('express')
const app = express()
const db = require('./src/config/db')
const userRoute = require('./src/routes/useRouteGetData')
const port = process.env.PORT
const localhost = process.env.HOST_NAME

//use View Engine
configViewEngine(app)
//Route 
app.get('', (req, res) => res.send('Hello World'))
// app.get('/sample', (req, res) => res.render('sample.ejs'))
app.use('/api', userRoute);


app.listen(port, localhost, () => console.log(`Example app listening at http://localhost:${port}`))