// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

//Include our RESTFul API 
const appAPI = require("./controllerAPI/api-controller");

/* 
 * Create a web server that uses express,
 * CORS and bodyParser
 */
const server = express();
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended:false}));

/**
 *  Map the urls with the API
 *  The default url is: /api
 */
server.use("/api", appAPI);

//start the web server on PORT: 3060
server.listen(3060);
console.log("Server is up now and running on port 3060");




