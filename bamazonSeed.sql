DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(255) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES (
    "Laptop",
    "Electronics",
    899.99,
    10
), (
    "Smartphone",
    "Electronics",
    399.99,
    6
), (
    "Mechanical Keyboard",
    "Electronics",
    99.99,
    50
), (
    "Mystery Novel",
    "Books",
    14.99,
    200
), (
    "Children's Book",
    "Books",
    9.99,
    120
), (
    "Fancy Lamp",
    "Home Decor",
    79.99,
    25
), (
    "Lightbulbs",
    "Home Decor",
    2.99,
    300
), (
    "T-Shirt",
    "Apparel",
    14.99,
    280
), (
    "Dress",
    "Apparel",
    19.99,
    275
), (
    "Pants",
    "Apparel",
    49.99,
    90
);