DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;


USE bamazon;

CREATE TABLE products (
    item_id INTEGER(11) NOT NULL AUTO_INCREMENT,
    product_name TEXT,
    department_name TEXT,
    price DECIMAL(10,4) NULL,
    stock_quantity INT,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apples", "Food & Drink", "0.38", "300");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bicycle", "Outdoors", "105.30", "15");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tent", "Outdoors", "87.55", "20");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bottled Water", "Food & Drink", "1.12", "150");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Computer", "Entertainment", "160.15", "50");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("VR Headset", "Entertainment", "210.50", "50");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Candy", "Food & Drink", "0.80", "210");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sleeping Bag", "Outdoors", "95.55", "60");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Speakers", "Entertainment", "105.55", "130");