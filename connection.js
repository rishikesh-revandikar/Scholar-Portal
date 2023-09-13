var mysql = require("mysql");

var con = mysql.createConnection({

    host:"localhost",
    user:"root",
    password:"pict12",
    database:"scholar_portal"
});

module.exports= con; 