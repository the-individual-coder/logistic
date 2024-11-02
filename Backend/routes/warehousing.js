const express = require('express')
const warehousing = express.Router()
const db = require('../database/connection')
// Get all warehousing records
warehousing.get("/getWarehouses", async (req, res) => {
    const query = "SELECT warehousing.*, assets.name FROM warehousing INNER JOIN assets ON warehousing.asset_id = assets.id";
    const result = await db(query);
    console.log(result);
    res.json(result);
});

// Register a new warehousing record
warehousing.post("/registerWarehouse", async (req, res) => {
    const { assetID, location, quantity, warehouse_name } = req.body;
    const query = `INSERT INTO warehousing (warehouse_name, asset_id, location, quantity) VALUES ('${warehouse_name}',${assetID}, '${location}', ${quantity})`;
    const result = await db(query);
    console.log(result);
    res.json(result);
});

// Update an existing warehousing record
warehousing.post("/updateWarehouse", async (req, res) => {
    const { warehouseID, location, quantity, warehouse_name} = req.body;
    const query = `UPDATE warehousing SET warehouse_name = '${warehouse_name}', location = '${location}', quantity = ${quantity} WHERE id = ${warehouseID}`;
    const result = await db(query);
    console.log(result);
    res.json(result);
});

// Delete a warehousing record
warehousing.delete("/removeWarehouse/:id", async (req, res) => {
    const query = `DELETE FROM warehousing WHERE id = ${req.params.id}`;
    const result = await db(query);
    console.log(result);
    res.json(result);
});
module.exports = warehousing 