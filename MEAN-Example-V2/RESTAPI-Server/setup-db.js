// Import the required modules
const express = require("express");
const dbcon = require("./database");

//  Connect to the database
let connection = dbcon.getConnection();
connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to db");
    setupDatabase();
});

function setupDatabase() {
    // Create Product Table
    let sqlCreateProduct = "CREATE TABLE IF NOT EXISTS product (" +
        "id int(10) NOT NULL AUTO_INCREMENT, " +
        "name varchar(50), description varchar(255), " +
        "image varchar(255), " +
        "price decimal(6,2), PRIMARY KEY (id))";
    connection.execute(sqlCreateProduct, (err) => {
        if (err) {
            console.log("Error while creating table: product");
        } else {
            console.log("Product Table created");
            insertProducts();
        }
    });

    /**
     *  Create Cart Table
     *  Set the productId as a primary key
     *  This will allow only one entry per product in the cart.
     *  This is just a simplified version of a cart. For multiple users, then we'll need a cartId or userId.
     */
    let sqlCreateCart = "CREATE TABLE IF NOT EXISTS cart (productId int(10), quantity int(10), price decimal(6,2)), PRIMARY KEY (productId))";
    connection.execute(sqlCreateCart, (err) => {
        if (err) {
            console.log("Error while creating table: cart");
        } else {
            console.log("Cart Table created");
        }
    });
}

function insertProducts() {
    let sqlInsert = [
        "INSERT INTO product (name, description, image, price) VALUES ('Americano','A rich cup of Coffee, American Style.', '/assets/img/americano.jpg', 15.00)",
        "INSERT INTO product (name, description, image, price) VALUES ('Cappuccino', 'Coffee under a layer of thick milk foam.', '/assets/img/cappuccino.jpg', 20.00)",
        "INSERT INTO product (name, description, image, price) VALUES ('Latte','Coffee with steamed milk.', '/assets/img/latte.jpg', 20.00)",
        "INSERT INTO product (name, description, image, price) VALUES ('Macchiato','Coffee with steamed milk with vanilla flavour, <br>topped with caramel.', '/assets/img/macchiato.jpg', 30.00)",
        "INSERT INTO product (name, description, image, price) VALUES ('Mocha', 'Rich Coffee with Mocha sauce', '/assets/img/mocha.jpg', 25.00)",
        "INSERT INTO product (name, description, image, price) VALUES ('Iced Americano','A rich cup of Iced Coffee, American Style.', '/assets/img/americano.jpg', 15.00)",
        "INSERT INTO product (name, description, image, price) VALUES ('Iced Cappuccino', 'Iced Coffee under a layer of thick milk foam.', '/assets/img/cappuccino.jpg', 20.00)",
        "INSERT INTO product (name, description, image, price) VALUES ('Iced Latte','Iced Coffee combined with milk.', '/assets/img/latte.jpg', 20.00)",
        "INSERT INTO product (name, description, image, price) VALUES ('Iced Macchiato','Iced Coffee with milk with vanilla flavour, <br>topped with caramel.', '/assets/img/macchiato.jpg', 30.00)",
        "INSERT INTO product (name, description, image, price) VALUES ('Iced Mocha', 'Rich Iced Coffee with Mocha sauce', '/assets/img/mocha.jpg', 25.00)"
    ];

    let completed = 0;
    let errors = 0;

    sqlInsert.forEach((query, idx) => {
        connection.execute(query, (err) => {
            if (err) {
                // Ignore duplicate entry errors (for reruns)
                if (err.code !== 'ER_DUP_ENTRY') {
                    console.log(`Error while inserting product ${idx + 1}:`, err.message);
                    errors++;
                }
            } else {
                console.log(`Inserted product ${idx + 1}`);
            }
            completed++;
            if (completed === sqlInsert.length) {
                closeConnection();
            }
        });
    });
}

function closeConnection() {
    connection.end((err) => {
        if (err) {
            console.log("Error closing the database connection:", err.message);
        } else {
            console.log("Database connection closed.");
        }
    });
}
