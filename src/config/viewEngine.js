const express = require('express')
const path = require('path')

const configViewEngine = (app) => {
    app.set('views', './src/views')
    app.set('view engine', 'ejs')
    //config static file
    // app.use(express.static(path.join(__dirname, 'public')))
    app.use(express.static('src/public'))

}
module.exports = configViewEngine;  