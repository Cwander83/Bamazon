-- Drops the favorite_db if it exists currently --
DROP DATABASE IF EXISTS bamazon_db;
-- Creates the "bamazon_db" database --
CREATE DATABASE bamazon_db;
-- Makes it so all of the following code will affect bamazon_db --
USE bamazon_db;

-- Creates the table "products" within bamazon_db --
CREATE TABLE orders(

	id int unsigned not null auto_increment primary key,
    name varchar(55) unique not null,
    department_name varchar(55) null,
    price DECIMAL(10,2) null,
    stock_quantity int null
);
-- add 10 products to the table
-- one
INSERT INTO orders (name, department_name, price, stock_quantity)
VALUE ("F-150", "automotive", 12000, 4);

-- two
INSERT INTO orders (name, department_name, price, stock_quantity)
VALUE ("Harley", "automotive", 3000, 2);

-- three
INSERT INTO orders (name, department_name, price, stock_quantity)
VALUE ("carseat", "automotive accessories", 40.50, 15);

-- four
INSERT INTO orders (name, department_name, price, stock_quantity)
VALUE ("helmet", "automotive accessories", 90, 40);

-- five
INSERT INTO orders (name, department_name, price, stock_quantity)
VALUE ("fishing rod", "sporting goods", 10.75, 25);

-- six
INSERT INTO orders (name, department_name, price, stock_quantity)
VALUE ("baseball", "sporting goods", 4, 100);

-- seven
INSERT INTO orders (name, department_name, price, stock_quantity)
VALUE ("Tundra", "automotive", 20000, 5);

-- eight
INSERT INTO orders (name, department_name, price, stock_quantity)
VALUE ("basketball", "sporting goods", 10, 14);

-- nine
INSERT INTO orders (name, department_name, price, stock_quantity)
VALUE ("snickers", "candy", 1.75, 30);

-- ten
INSERT INTO orders (name, department_name, price, stock_quantity)
VALUE ("strawberries", "grocery", 3, 28);
 