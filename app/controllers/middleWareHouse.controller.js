const MiddleWarehouse = require("../models/middleWarehouse.model");

// Create and Save a new Product
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // Create a MiddleWarehouse
    const middleWarehouse = new MiddleWarehouse({
        warehouseId: req.body.warehouseId,
        productId: req.body.productId,
        productNumber: req.body.productNumber,
    });
    // Save Product in the database
    MiddleWarehouse.create(middleWarehouse, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Product."
            });
        else res.send(data);
    });
};


