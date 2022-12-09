const express = require("express")
const bodyParser = require("body-parser")
const fs = require('fs');
const cors = require('cors');
//create our express app
const app = express()
//middleware
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
//route
const routes = require('./route/Route')
app.use('/', routes)
//start server
app.listen(3000, ()=>{
    console.log("listening at port:3000")
})