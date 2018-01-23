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

    start();
});

function start (){
    console.log("Selecting all orders...\n");
    connection.query("SELECT * FROM orders", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
    console.table(res);


    // inquirer.prompt({

    // })
    // .then(function(response){


    // })
    });
}