var mysql = require("mysql");
var inquirer = require("inquirer");
// call once somewhere in the beginning of the app
const cTable = require('console.table');


// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Supra1234",
    database: "bamazon_db"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    console.log('connected to sql with id: ' + connection.threadId);
    // run the start function after the connection is made to prompt the user
    //where you call the first function -----
    myTable();

});



function start() {

    console.log("Selecting all orders...\n");
    connection.query("SELECT * FROM orders", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement

        inquirer.prompt([{

                    name: 'id',
                    type: 'input',
                    message: 'Please select the Item # of item to purchase',
                    validate: function validateOrder(order) {
                        var reg = /^([1-9]|10)$/;
                        return reg.test(order) || "Please enter a valid ItemId";
                    }
                },
                {
                    name: 'quantity',
                    type: 'input',
                    message: 'How many would you like to purchase?',
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                }
            ])
            .then((answer) => {
                purchase(answer.id, answer.quantity);
            });
    });
};

function myTable() {
    connection.query('SELECT * FROM orders', (err, res) => {
        const myTable = [];

        res.forEach(element => {
            let newRow = {};
            newRow.id = element.id;
            newRow.name = element.name;
            newRow.price = element.price;
            newRow.stock_quantity = element.stock_quantity;
            myTable.push(newRow);
        });
        console.table(myTable);
    });
    start();
};

function purchase(id, quantity) {
    let query = 'SELECT * FROM orders WHERE ?';
    connection.query(query, {
        item_id: id
    }, function (err, res) {
        console.log('----------------------------');
        console.log(`id of product: ${id}`);
        console.log(`quantity of purchase: ${quantity}`);
        console.log('----------------------------');
        console.table(myTable);
        myTable();



    })
}