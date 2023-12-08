require('dotenv').config()

const configViewEngine = require('./src/config/viewEngine')
const express = require('express')
const app = express()
const db = require('./src/config/db')
const userRoute = require('./src/routes/useRouteGetData')
const bodyParser = require('body-parser')
const port = process.env.PORT
const localhost = process.env.HOST_NAME

//use View Engine
configViewEngine(app)
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())
//Route 
app.get('/', (req, res) => res.send('Hello World'))
// app.get('/sample', (req, res) => res.render('sample.ejs'))
app.use('/api', userRoute);


app.listen(port, localhost, () => console.log(`Example app listening at http://localhost:${port}`))