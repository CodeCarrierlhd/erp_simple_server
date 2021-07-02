const AfterSaleHistory = require("../models/afterSaleHistory.model");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // Create a AfterSale
    const afterSaleHistory = new AfterSaleHistory({
        afterSaleId: req.body.afterSaleId,
        newOrderNumber: req.body.newOrderNumber,
        changePart: req.body.changePart,
        changeAccount: req.body.changeAccount,
        changeDate: req.body.changeDate,
    });
    // Save AfterSale in the database
    AfterSaleHistory.create(afterSaleHistory, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the AfterSaleHistory."
            });
        else res.send(data);
    });
};
exports.findOne = (req, res) => {
    AfterSaleHistory.findById(req.params.afterSaleId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.params.afterSaleId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Customer with id " + req.params.afterSaleId
                });
            }
        } else res.send(data);
    });
};



