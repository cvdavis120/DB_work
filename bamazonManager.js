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
var allItems = []

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
            connection.query('SELECT * FROM products',
                function (err, res) {
                    if (err) throw err;
                    for (i = 0; i < res.length; i++) {
                        allItems.push(res[i].product_name)
                    }
                })
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

function addToInv() {

    inquirer.prompt([{
            type: "list",
            choices: allItems,
            message: "Which item would you like to add to?",
            name: "addedItem"
        },
        {
            type: "input",
            message: "What quantity to add?",
            name: "unitQty"
        }
    ]).then(function (userResponse) {
        var initQ = 0
        // THIS DOES NOT WORK
        connection.query('SELECT stock_quantity FROM products WHERE product_name ="' + connection.escape(userResponse.addedItem) + '"', function (err, resp) {
            console.log(resp);
            // if (err) throw err;
            // console.log(resp)
            // for (i = 0; i < allItems.length; i++) {
            //     if (resp[i].product_name === userResponse.addedItem) {
            //         initQ = resp[i].stock_quantity
            //     }
            // }
            connection.query('UPDATE products SET ? WHERE ?',
                [{
                        stock_quantity: (initQ + userResponse.unitQty)
                    }, {
                        product_name: userResponse.addedItem
                    }

                ],
                function (errr) {
                    if (errr) throw errr;
                    console.log("Inventory Updated!");
                    mainMenu()
                });
        })


    })


}

mainMenu()