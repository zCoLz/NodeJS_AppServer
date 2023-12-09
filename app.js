require('dotenv').config()

const configViewEngine = require('./src/config/viewEngine')
const express = require('express')
const app = express()
const db = require('./src/config/db')
const userRouteData = require('./src/routes/useRouteGetData')
const useRouteTime = require('./src/routes/useRouteTime')
const bodyParser = require('body-parser')
const port = process.env.PORT
const localhost = process.env.HOST_NAME

//use View Engine
configViewEngine(app)
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())
app.get('/test', (req, res) => {
    res.json({ success: true, message: 'Welcome to backend' })
})
//Route 
app.use('/api', userRouteData);
app.use('/api', useRouteTime)


app.listen(port, localhost, () => console.log(`Example app listening at http://localhost:${port}`))