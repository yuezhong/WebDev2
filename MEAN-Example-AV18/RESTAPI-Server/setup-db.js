// Import the required modules
const express = require("express");
const dbcon = require("./database");

//  Connect to the database
let connection = dbcon.getConnection();
connection.connect((err) => {
    if(err)	throw err;
    	console.log("Connected to db");
});


// The following section provides an example on to how to create a Table and insert Data
// Please provide your own. You will need a minimum of 10 lines of Data per Table.

/**  
 *  Create Product Table in DB
 */
let sqlCreateProduct = "CREATE TABLE product (" +
								"id int(10) NOT NULL AUTO_INCREMENT, " +
								"name varchar(50), description varchar(255), " + 
								"image varchar(255), " + 
								"price decimal(6,2), PRIMARY KEY (id))";
connection.execute(sqlCreateProduct, (err, records) => {
	if(err) {
		console.log("Error while creating table: product");
	}
	else {
		console.log("Product Table created");
	}
});

/**
 *  Insert Data into Product Table
 */
let sqlInsert = new Array();
sqlInsert[0] = "INSERT INTO product ('name', 'description', 'image', 'price') VALUES ('Americano','A rich cup of Coffee, American Style.', 'assets/img/americano.jpg', 15.00)";
sqlInsert[1] = "INSERT INTO product ('name', 'description', 'image', 'price') VALUES ('Cappuccino', 'Coffee under a layer of thick milk foam.', 'assets/img/cappuccino.jpg', 20.00)";
sqlInsert[2] = "INSERT INTO product ('name', 'description', 'image', 'price') VALUES ('Latte','Coffee with steamed milk.', 'assets/img/latte.jpg', 20.00)";
sqlInsert[3] = "INSERT INTO product ('name', 'description', 'image', 'price') VALUES ('Macchiato','Coffee with steamed milk with vanilla flavour, <br>topped with caramel.', 'assets/img/macchiato.jpg', 30.00)";
sqlInsert[4] = "INSERT INTO product ('name', 'description', 'image', 'price') VALUES ('Mocha', 'Rich Coffee with Mocha sauce', 'assets/img/mocha.jpg', 25.00)";
sqlInsert[5] = "INSERT INTO product ('name', 'description', 'image', 'price') VALUES ('Iced Americano','A rich cup of Iced Coffee, American Style.', 'assets/img/americano.jpg', 15.00)";
sqlInsert[6] = "INSERT INTO product ('name', 'description', 'image', 'price') VALUES ('Iced Cappuccino', 'Iced Coffee under a layer of thick milk foam.', 'assets/img/cappuccino.jpg', 20.00)";
sqlInsert[7] = "INSERT INTO product ('name', 'description', 'image', 'price') VALUES ('Iced Latte','Iced Coffee combined with milk.', 'assets/img/latte.jpg', 20.00)";
sqlInsert[8] = "INSERT INTO product ('name', 'description', 'image', 'price') VALUES ('Iced Macchiato','Iced Coffee with milk with vanilla flavour, <br>topped with caramel.', 'assets/img/macchiato.jpg', 30.00)";
sqlInsert[9] = "INSERT INTO product ('name', 'description', 'image', 'price') VALUES ('Iced Mocha', 'Rich Iced Coffee with Mocha sauce', 'assets/img/mocha.jpg', 25.00)";

for(let i=0; i < sqlInsert.length; i++)
{
	connection.execute(sqlInsert[i], (err, records) => {
		if(err) {
			console.log("Error while Inserting into Product table");
		}
		else {
			console.log("SQL is executed for inserting into Product table");
		}
    });
}

/**  
 *  Create Cart Table in DB
 */
let sqlCreateCart = "CREATE TABLE cart (productId int(10), quantity int(10), price decimal(6,2))";
connection.execute(sqlCreateCart, (err, records) => {
	if(err) {
		console.log("Error while creating table: cart");
	}
	else {
		console.log("Cart Table created");
	}
});
