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


/** 
 * Get product Quantity 
 * @param productID
 */
 router.get("/cart/quantity/:id", (req, res) => {
	connection.query("SELECT quantity FROM `cart` WHERE `productID` = '" + req.params.id +"';", (err, records, fields) => {
		if(err) {
			console.log("Error retrieving data.");
		}
		else {
			res.send(records);
		}
	})
 });

/*
 *	Get Join of Cart and Product
 */
router.get("/cart/products", (req, res) => {
	connection.query("SELECT * FROM `cart` join `product` on `product`.`id` = `cart`.`productID`;", (err, records, fields) => {
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
 *  @param productID
 *  @param quantity
 *  @param price
 */
router.post("/cart", (req, res) => {
	let productID = req.body.productID;
	let quantity = req.body.quantity;
	let price = req.body.price;

	connection.query("INSERT INTO cart VALUES ('" 
						+ productID + "', '" 
						+ quantity + "', '"
						+ price + "')", (err, records, fields) => {
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