require('dotenv').config()
var mysql = require('mysql');

var con = mysql.createConnection({
    host            : process.env.HOST,
    database        : process.env.DBASE,
    user            : process.env.USER,
    password        : process.env.PASS 
});

con.connect(function (err){
    if(err) throw err;
});

module.exports = con;