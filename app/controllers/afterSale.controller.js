const AfterSale = require("../models/afterSale.model");

// Create and Save a new AfterSale
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // Create a AfterSale
    const afterSale = new AfterSale({
        account: req.body.account,
        orderNumber: req.body.orderNumber,
        sku: req.body.sku,
        saleDate: req.body.saleDate,
        sendWarehouse: req.body.sendWarehouse,
        backWarehouse: req.body.backWarehouse,
        backNumber: req.body.backNumber,

        flowOrderNumber: req.body.flowOrderNumber,
        productImage: req.body.productImage,
        remark: req.body.remark,
    });
    // Save AfterSale in the database
    AfterSale.create(afterSale, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the AfterSale."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {    
    AfterSale.getAll(req.query.value,(err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Warehouse."
            });
        else res.send(data);
    });
};



