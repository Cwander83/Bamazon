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
    //console.log('connected to sql with id: ' + connection.threadId);
    // run the start function after the connection is made to prompt the user
    //where you call the first function -----
    myTable();

});

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

function start() {
    console.log('\n  **  WELCOME TO BAMAZON  **\n');
    console.log('HOME OF ALL YOUR TERMINAL SHOPPING NEEDS\n');
    connection.query("SELECT * FROM orders", (err, res) => {
        if (err) throw err;
        // Log all results of the SELECT statement

        inquirer.prompt([{

                    name: 'id',
                    type: 'input',
                    message: 'Please select the Item # of item to purchase',
                    validate: function validateOrder(order) {
                        let reg = /^([1-9]|10)$/;
                        return reg.test(order) || "Please enter a valid ItemId";
                    }
                },
                {
                    name: 'quantitySold',
                    type: 'input',
                    message: 'How many would you like to purchase?',
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return console.log("not a proper number");;
                    }
                }
            ])
            .then((answer) => {
                purchase(answer.id, answer.quantitySold);
            });
    });
};



function purchase(id, quantitySold, name) {
    let query = 'SELECT * FROM orders WHERE ?';
    connection.query(query, {
        
        item_id: id
    }, function (err, res) {
        console.log('----------------------------');
        console.log(`id of product: ${id}`);
        console.log(`name of product: ${res[id].name}`);
        console.log(`quantity of purchase: ${quantitySold}`);
        console.log('----------------------------');
        console.table(myTable);
        myTable();



    })
}