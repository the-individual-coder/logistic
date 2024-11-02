const express = require('express')
const asset = express.Router()
const db = require('../database/connection')

// Get all assets
asset.get("/getAssets", async (req, res) => {
    const query = "SELECT * FROM assets";
    const result = await db(query);
    console.log(result);
    res.json(result);
});

// Register a new asset
asset.post("/registerAsset", async (req, res) => {
    const { name, description, value, status } = req.body;
    const query = `INSERT INTO assets (name, description, value, status) VALUES ('${name}', '${description}', ${value}, '${status}')`;
    const result = await db(query);
    console.log(result);
    res.json(result);
});

// Update an existing asset
asset.post("/updateAsset", async (req, res) => {
    const { assetID, name, description, value, status } = req.body;
    console.log("body :>>", req.body)
    const query = `UPDATE assets SET name = '${name}', description = '${description}', value = ${value}, status = '${status}' WHERE id = ${assetID}`;
    const result = await db(query);
    console.log(result);
    res.json(result);
});

// Delete an asset
asset.delete("/removeAsset/:id", async (req, res) => {
    const query = `DELETE FROM assets WHERE id = ${req.params.id}`;
    const result = await db(query);
    console.log(result);
    res.json(result);
});
module.exports = asset