const LogisticsStatistics = require("../models/logisticsStatistics.model");

// Retrieve all Warehouse from the database.
exports.findAll = (req, res) => {        
    LogisticsStatistics.getAll(req.keyValue.keyValue, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Warehouse."
            });
        else res.send(data);
    });
};