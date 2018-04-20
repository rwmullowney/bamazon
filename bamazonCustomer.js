var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');

// Establish a connection to the SQL server
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon"
});

// connection.connect(function (err) {
//     if (err) throw err;
//     console.log("connected as id " + connection.threadId + "\n");
// });



var query = "SELECT * FROM products"
connection.query(query, function (err, res) {
    console.table(res)
})

