const Warehouse = require("../models/warehouse.model");

// Retrieve all Warehouse from the database.
exports.findAll = (req, res) => {
    Warehouse.getAll(req.params.inWarehouse, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Warehouse."
            });
        else res.send(data);
    });
};

exports.findAllWarehouse = (req, res) => {
    Warehouse.getAllWarehouse((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Warehouse."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Warehouse.findById(req.params.warehouseId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found warehouse with id ${req.params.warehouseId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving warehouse with id " + req.params.warehouseId
                });
            }
        } else res.send(data);
    });
};

exports.findOneBySku = (req, res) => {
    Warehouse.findBySku(req.params.sku, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found warehouse with id ${req.params.sku}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving warehouse with sku " + req.params.sku
                });
            }
        } else res.send(data);
    });
};
exports.findOneByType = (req, res) => {
    Warehouse.findByType(req.query, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found warehouse with warehouseType ${req.params.warehouseType}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving warehouse with warehouseType " + req.params.warehouseType
                });
            }
        } else res.send(data);
    });
};

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const warehouse = new Warehouse({
        cabinNumber: req.body.cabinNumber,
        containerNumber: req.body.containerNumber,
        wareHouseModel: req.body.wareHouseModel,
        sealPart: req.body.sealPart,
        deliveryDate: req.body.deliveryDate,
        remark: req.body.remark,
        arrivalTime: req.body.arrivalTime,
        inWarehouse: req.body.inWarehouse,
        warehouseType: req.body.warehouseType,
        fileUpload: req.body.fileUpload,
    });
    // Save Warehouse in the database
    Warehouse.create(warehouse, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the warehouse."
            });
        else res.send(data);
    });
};
exports.delete = (req, res) => {
    console.log(req.query.ids);

    Warehouse.remove(req.query.ids, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Warehouse with id.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Warehouse with id "
                });
            }
        } else res.send({ message: `Warehouse was deleted successfully!`, data });
    });
};
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    Warehouse.updateById(
        req.body.params.warehouseId,
        new Warehouse(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Warehouse with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Warehouse with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};