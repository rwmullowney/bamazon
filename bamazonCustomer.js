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


// Displays the table of products
var displayProducts = function () {
    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        console.log()
        console.table(res);
    })
}

// Initiates the prompt to the user
var promptUser = function () {
    inquirer.prompt([{
            name: "ID",
            message: "Please enter the ID of the item you would like to purchase: "
        }])
        .then(function (answer) {
            checkItemID(answer);
        })
};

// Declares variable for the item ID for later reference
var itemID;
// Determines whether the item ID entered is valid
var checkItemID = function (answer) {
    connection.query("SELECT * FROM products WHERE ?", {
            item_id: answer.ID
        },
        function (err, res) {

            // Checks if resulting array is empty, indicating it's an invalid item ID (i.e. there's no associated data with it)
            if (res.length === 0) {
                console.log("Not a valid item ID.");

                // Repeats initial prompt if not valid
                promptUser();
            } else {
                // Assigns the item ID to a variable if valid
                itemID = res[0].item_id;

                // Asks quantity user wants to purchase if valid item ID
                quantityPrompt();
            }
        })
};


// Asks quantity user wants to purchase if valid item ID
var quantityPrompt = function () {
    inquirer.prompt([{
            name: "quantity",
            message: "How many would you like to purchase? "
        }])
        .then(function (answer) {
            checkQuantity(answer);
        })
};

// Checks if store supply means quantity requested
var checkQuantity = function (answer) {
    connection.query("SELECT * FROM products WHERE ?", {
            item_id: itemID
        },
        function (err, res) {
            if (answer.quantity > res[0].stock_quantity) {
                console.log("That's more than our stock!");

                // Re-prompts the user for the quantity they'd like to purchase if too much
                quantityPrompt();
            } else {

                // Declares variables for the quantity ordered, quantity after ordered, and the order cost
                quantityAfterOrder = res[0].stock_quantity - answer.quantity;
                var orderSum = (res[0].price * answer.quantity);

                console.log("Item(s) ordered!")
                console.log("Cost of order: $" + orderSum)
                submitOrder()
            }
        })
}

var quantityAfterOrder;
// Updates the quantity in the database to reflect the order
var submitOrder = function () {
    connection.query("UPDATE products SET ? WHERE ?", [{
            stock_quantity: quantityAfterOrder
        }, {
            item_id: itemID
        }],
        function (err, res) {
            connection.end()
        })


}

// Initiates functions to start program
displayProducts();
promptUser();