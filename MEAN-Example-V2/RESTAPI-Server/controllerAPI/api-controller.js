/** 
 * Import the required modules 
 */
const express = require('express');
const router = express.Router();
const dbcon = require("../database");
const connection = dbcon.getConnection();

// Connect to db
connection.connect();

/** 
 * 	The following section sets up some sample API routes.
 *  More API routes will need to be included in order to
 *  complete the application.
 */

/***************************************************************************************************** 
 * Product Table
 */

/**  
 *  GET all Product records
 */
router.get("/product", (req, res) => {
	connection.query("SELECT * FROM product", (err, records, fields) => {
		if(err) {
			console.log("Error when retriving the data");
		}
		else {
			res.send(records);
		}
	});
});

/** 
 * GET with Parameter ID
 * @param id
 */
router.get("/product/:id", (req, res) => {
	connection.query("SELECT * FROM product WHERE id = '" + req.params.id + "'", (err, records, fields) => {
		if(err){
			console.log("Error when retriving the data");
		}
		else{
			res.send(records);
		}
	});
});

/**
 *  POST - INSERT new values into Table
 *  @param id
 *  @param name
 *  @param description
 *  @param image
 */
router.post("/product", (req, res) => {
	let name = req.body.name;
	let description = req.body.description;
	let image = req.body.image;
	let price = req.price;

	connection.query("INSERT INTO product (name, description, image, quantity, price) VALUES ('" 
						+ name + "', '" 
						+ description + "', '" 
						+ image +  "', '" 
						+ price + "')", (err, records, fields) => {
		if(err) {
			console.log(err);
			console.log("Error when inserting the data");
			res.send({insert:"failed"});
		}
		else {
			res.send({insert: "success"});
		}
	});
});


/**
 *  Delete - Delete item based on id
 *  @param id
 */
router.delete("/product/:id", (req, res) => {
	let id = req.params.id;
	
	connection.query("DELETE FROM product WHERE id = " + id, (err, records, fields) => {
		if(err){
			console.log(err);
			console.log("Error when deleting the data");
		}
		else{
			res.send({delete: "success"});
		}
	});
});

/*****************************************************************************************************************************
 * Cart Table
 */

/*
 *	Get all from Cart
 */
router.get("/cart", (req, res) => {
	connection.query("SELECT * FROM `cart`;", (err, records, fields) => {
		if(err) {
			console.log("Error retrieving data.");
		}
		else {
			res.send(records);
		}
	})
});


router.get("/cart/quantity/:id", (req, res) => {
  const productID = req.params.id;

  // Use a placeholder (`?`) and pass productID as a parameter to avoid SQL injection
  connection.query(
    "SELECT quantity FROM cart WHERE productID = ? LIMIT 1",
    [productID],
    (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "DB error" });
      }

      // rows is an array; if empty → product not in cart
      if (!rows || rows.length === 0) {
        return res.json({ productID: +productID, quantity: 0 });
      }

      // Send the single row as an object
      res.json({ productID: +productID, quantity: rows[0].quantity });
    }
  );
});

/*
 *	Get Join of Cart and Product
 */
router.get("/cart/products", (req, res) => {
	let sql = `SELECT c.productID, c.quantity, c.price, 
					  p.name AS name, p.description, p.image, 
					  p.price AS price
	 			FROM cart c join product p 
				on p.id = c.productID;`; 


	connection.query(sql, (err, records, fields) => {
		if(err) {
			console.log("Error retrieving data.");
		}
		else {
			res.send(records);
		}
	})
});

/**
 *  POST - INSERT new values into Cart Table
 *  If the product already exists, it will update the quantity and price.
 *  If it does not exist, it will insert a new record.
 *  @param productID
 *  @param quantity
 *  @param price
 */
router.post("/cart", (req, res) => {
	let productID = req.body.productID;
	let quantity = Number(req.body.quantity) || 1; // Default to 1 if quantity is not provided
	let price = Number(req.body.price);

	let sql = `
		INSERT INTO cart (productID, quantity, price) 
		VALUES (?, ?, ?)
		ON DUPLICATE KEY UPDATE 
		quantity = quantity + VALUES(quantity),
		price = VALUES(price);
		`;
	connection.query(sql, [productID, quantity, price], 
		(err) => {
		if(err) {
			console.log(err);
			res.send({insert:"failed"});
		}
		else {
			res.send({insert: "success"});
		}
	});
});

/**
 *  PUT - Update table with new quantity
 *  @param id
 *  @param quantity
 */
router.put("/cart", (req, res) => {
	let productID = req.body.productID;
	let quantity = req.body.quantity;
	connection.query("UPDATE `cart` SET `quantity` = '" + quantity + "' where `productID` = '" + productID + "';", 
	(err, result) => {
		 if (err){
			 console.error("Error while Updating the data" + err);
		 }else{
			 res.send({update:"success"});
		 }
	});
});

/**
 *  Delete - Delete item based on productID
 *  @param productID
 */
router.delete("/cart/:productID", (req, res) => {
	connection.query("DELETE FROM cart WHERE productID = '" + req.params.productID + "'", (err, records, fields) => {
		if(err) {
			console.log(err);
			console.log("Error when deleting the data");
		}
		else{
			res.send({delete: "success"});
		}
	});
});



// Export API routes
module.exports = router;