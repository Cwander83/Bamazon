var mysql = require("mysql");
var inquirer = require("inquirer");
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
    console.log('\n  **  WELCOME TO BAMAZON  **\n');
    console.log('HOME OF ALL YOUR TERMINAL SHOPPING NEEDS\n');
    myTable();

});
// starts by showing the orders table 
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
    
    start();                //moves on to the store questions
};

function start() {
    connection.query("SELECT * FROM orders WHERE stock_quantity > 0", (err, res) => {
        if (err) throw err;

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
                connection.query('SELECT name, stock_quantity, price FROM orders WHERE id = ?', [
                    answer.id
                ], function (err, res) {

                    // sends the statement if the order quantity is more then stock
                    if (answer.quantitySold > res[0].stock_quantity) {
                        //prompts message that not enough items in stock
                        console.log('\n------------------------\n');
                        console.log("Insufficient quantity!");
                        console.log('the current stock for ' + res[0].name + ' is: ' +
                            res[0].stock_quantity);
                        console.log('Please order ' + res[0].stock_quantity + ' or less of ' + res[0].name);
                        console.log('\n------------------------\n');

                        return start();
                    }
                    // where the mySQL database table is updated and show order go through
                    connection.query(
                        "UPDATE orders SET ? WHERE ?", [{
                                stock_quantity: res[0].stock_quantity - answer.quantitySold
                            },
                            {
                                id: answer.id
                            }
                        ],
                        function (error) {
                            if (error) throw err;
                            // shows the order purchased
                            console.log('\n----------------------------\n');
                            console.log(`name: ${res[0].name}`);
                            console.log(`You have purchased: ${answer.quantitySold} unit`);
                            console.log('total cost: $' + answer.quantitySold * res[0].price);
                            console.log('\n----------------------------\n');

                            console.table(myTable);     //shows the updated table
                            // restarts the ordering process
                            myTable();

                        });
                })
            });
    });
};