// Import required modules 
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const http = require("http");

// Import our db details
var db = require("./db-details.js");

// Create db Connection
module.exports = {
    getConnection: ()=>{
        return mysql.createConnection({
            host: db.host,
            user: db.user,
            password: db.password,
            database: db.database 
        });
    }
};
