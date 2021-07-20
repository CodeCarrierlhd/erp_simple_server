const PartsStatistics = require("../models/partsStatistics.model");
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // Create a partsStatistics
    const partsStatistics = new PartsStatistics({
        account: req.body.account,
        saleDate: req.body.saleDate,
        orderNumber: req.body.orderNumber,
        sku: req.body.sku,
        wayType: req.body.wayType,
        wayPart: req.body.wayPart,
        remark: req.body.remark,
    });
    // Save partsStatistics in the database
    PartsStatistics.create(partsStatistics, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the partsStatistics."
            });
        else res.send(data);
    });
};

exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    PartsStatistics.updateById(
        req.body.params.partsStatisticsId,
        new PartsStatistics(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Customer with id ${req.params.partsStatisticsId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Customer with id " + req.params.partsStatisticsId
                    });
                }
            } else res.send(data);
        }
    );
};
exports.findAll = (req, res) => {
    PartsStatistics.getAll(req.query,(err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Warehouse."
            });
        else res.send(data);
    });
};