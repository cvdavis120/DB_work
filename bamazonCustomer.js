var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "saugatuck244!",
    database: "bamazon"
});
var idArr = []
// Display all items avaliable 
function displayAll() {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;
        for (i = 0; i < res.length; i++) {
            idArr.push(res[i].item_id)
            console.log("\nItem ID: " + res[i].item_id);
            console.log("Product Name: " + res[i].product_name);
            console.log("Department Name: " + res[i].department_name);
            console.log("Price per Unit: " + res[i].price);
            console.log("Stock on hand: " + res[i].stock_quantity);
            console.log("_____________\n");
        }

        appStart()
    })
}
// Run Start
displayAll()

// Prompt two things, ID of the item 
function appStart() {

    inquirer.prompt([{
            type: "list",
            message: "What item would you like to buy?",
            choices: idArr,
            name: "itemChoice"
        },
        {
            type: "input",
            message: "What quantity would you like to purchase?",
            name: "itemQty"

        }
    ]).then(function (response) {
        var itemPick = ""
        var itemPrice = ""
        var iQty = ""
        connection.query('SELECT * FROM products', function (err, res) {
            if (err) throw err;
            for (i = 0; i < res.length; i++) {
                if (res[i].item_id === response.itemChoice) {
                    itemPick = res[i].product_name
                    itemPrice = res[i].price
                    iQty = res[i].stock_quantity
                }
            }
            if (iQty < response.itemQty) {
                console.log("Insufficient quantity!");
                appStart()
            } else {
                iQty -= response.itemQty
                iQty = parseInt(iQty)
                // console.log("good good");
                // console.log(iQty);
                connection.query('UPDATE products SET ? WHERE ?',
                    [{
                            stock_quantity: (iQty)
                        }, {
                            product_name: itemPick
                        }

                    ],
                    function (err) {
                        if (err) throw err;
                    });
                var totalAmount = itemPrice * response.itemQty;
                console.log("Your total today is: $" + totalAmount);
            }

            connection.end()
        })


    })
}