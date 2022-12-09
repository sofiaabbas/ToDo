const express = require("express");
//const bodyParser = require("body-parser");
const fs = require('fs');
const cors = require('cors');
const routes = require('./route/Route');
//create our express app
const app = express();
//middleware
app.use(cors());
/*app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()) */
app.use(express.urlencoded({extended: true}))
app.use(express.json({type: "*/*"}))
//app.use(express.json())
/* app.post("/task/addtask", (req, res, next) => {
    console.log("Logging req.body..", req.body)
    next();
}) */
//route

app.use('/', routes)
//start server
app.listen(3000, ()=>{
    console.log("listening at port:3000")
})