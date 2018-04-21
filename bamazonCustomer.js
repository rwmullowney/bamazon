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


var displayProducts = function () {
    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        console.log()
        console.table(res);
    })
}

var correctItemID = true;
var itemID;
var promptUser = function () {
    
    inquirer.prompt([{
                name: "itemID",
                message: "Please enter the ID of the item you would like to purchase: "
            }
            // , {
            //     name: "quantity",
            //     message: "How many would you like to buy? "
            // }
        ])
        .then(function (answer) {
            itemID = answer.itemID
            checkItemID(answer);
            if (!correctItemID){
                promptUser();
            }
            else{quantityPrompt()}
        })
};


var checkItemID = function (answer) {
    connection.query("SELECT * FROM products WHERE ?", {
        item_id: itemID
    },
        function (err, res) {
            if (answer.itemQuantity > res[0].stock_quantity) {
                console.log("That's more than our stock!");
                quantityPrompt();
            }
            console.log("Item(s) ordered!")
        })
}


var quantityPrompt = function(){
    inquirer.prompt([{
        name: "itemQuantity",
        message: "How many would you like to purchase? "
    }])
    .then(function(answer){
        checkQuantity(answer);
    })
};

var checkQuantity = function (answer) {
    connection.query("SELECT * FROM products WHERE ?", {
        item_id: answer.itemID
    },
        function (err, res) {
            if (res.length === 0) {
                console.log("Not a valid item ID.");

                // Restart the user prompt
                // Why is this not currently working?
                // promptUser();
                correctItemID = false;
                return correctItemID;
            }
            console.log(res[0].stock_quantity);
            // promptUser();
        })
};
// Since I'm running out of time at work, here's what I think needs to be done moving forward:
// First have the inquirer ask the ID of the item to be purchased.  If it's not there, i.e.
// if the array that's returned has a length of zero, present text saying that item is not found and to try again.
// Probably have a function to display the table if it gets pushed up too high (but that maybe shouldn't be a problem).
// 
//
displayProducts()
promptUser();