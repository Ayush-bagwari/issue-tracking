const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const expressLayouts = require('express-ejs-layouts');
const router = require('../route');
const path = require('path');
require('../database/mongodb')();

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(router);
app.use(express.static('./assets'));

app.listen(port,()=>{
    console.log(`port running on ${port}`);
});