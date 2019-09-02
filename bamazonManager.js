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
var messageoptions = ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "QUIT"]

function mainMenu() {
    inquirer.prompt([{
        type: "list",
        choices: messageoptions,
        message: "What would you like to do?",
        name: "choice"
    }]).then(function (response) {
        if (response.choice === "QUIT") {
            return false
        } else {

            switch (response.choice) {
                case "View Products for Sale":
                    console.log("WE HERE ");
                    seeAll();
                    break;
                case "View Low Inventory":
                    lowInv();
                    break;
                case "Add to Inventory":
                    addToInv();
                    break;

            }
        }
    })

}



function seeAll() {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;

        for (i = 0; i < res.length; i++) {

            console.log("\nItem ID: " + res[i].item_id);
            console.log("Product Name: " + res[i].product_name);
            console.log("Department Name: " + res[i].department_name);
            console.log("Price per Unit: " + res[i].price);
            console.log("Stock on hand: " + res[i].stock_quantity);
            console.log("_____________\n");
        }
        mainMenu()

    })
}

function lowInv() {
    connection.query('SELECT * FROM products WHERE stock_quantity < 5', function (err, res) {
        if (err) throw err;

        for (i = 0; i < res.length; i++) {

            console.log("\nItem ID: " + res[i].item_id);
            console.log("Product Name: " + res[i].product_name);
            console.log("Department Name: " + res[i].department_name);
            console.log("Price per Unit: " + res[i].price);
            console.log("Stock on hand: " + res[i].stock_quantity);
            console.log("_____________\n");
        }
        if (res.length === 0) {
            console.log("There are no low inventory items.");
        }
        mainMenu()

    })
}

function addToInv(id, amt) {
    var itemIds = []
    var initStocks = []
    var itemName = []
    connection.query('SELECT price, stock_quantity FROM products'),
        function (err, res) {
            if (err) throw err;
            for (i = 0; i < res.length; i++) {
                itemIds.push(res[i].item_id)
                initStocks.push(res[i].stock_quantity)
                itemName.push(res[i].product_name)
            }
            inquirer.prompt([{
                    type: "list",
                    choices: itemName,
                    message: "Which item would you like to add to?",
                    name: "addedItem"
                },
                {
                    type: "input",
                    message: "What quantity to add?",
                    name: "unitQty"
                }
            ]).then(function (response) {
                var initQ = 0
                for (i = 0; i < res.length; i++) {
                    if (res[i].product_name === response.addedItem) {
                        initQ = res[i].stock_quantity
                    }
                }
                connection.query('UPDATE products SET ? WHERE ?',
                    [{
                            stock_quantity: (initQ - 1)
                        }, {
                            product_name: response.addedItem
                        }

                    ],
                    function (err) {
                        if (err) throw err;
                        console.log("Inventory Updated!");
                        mainMenu()
                    });

            })
        }

}

mainMenu()