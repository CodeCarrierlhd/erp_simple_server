const Product = require("../models/product.model");

// Create and Save a new Product
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // Create a Product
    const product = new Product({
        mpn: req.body.mpn,
        soldSeparately: req.body.soldSeparately,
        productName: req.body.productName,
        mainColor: req.body.mainColor,
        mainMaterial: req.body.mainMaterial,
        productSize: req.body.productSize,
        manualBook: req.body.manualBook,
        nowPrice: req.body.nowPrice,
        showPrice: req.body.showPrice,
        productTypeId: req.body.productTypeId,
        length: req.body.length,
        width: req.body.width,
        height: req.body.height,
        weight: req.body.weight,
        mainImg: req.body.mainImg,
        desProduct: req.body.desProduct,
        materailImage: req.body.materailImage,
        manualImage: req.body.manualImage
    });
    // Save Product in the database
    Product.create(product, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Product."
            });
        else res.send(data);
    });
};
exports.findAll = (req, res) => {
    Product.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Warehouse."
            });
        else res.send(data);
    });
};

exports.findWarehouseAllProduct = (req, res) => {
    Product.getWarehouseAllProduct(req.query.value,(err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Warehouse."
            });
        else res.send(data);
    });
};

exports.delete = (req, res) => {
    console.log(req.query.ids);

    Product.remove(req.query.ids, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Product with id.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Product with id "
                });
            }
        } else res.send({ message: `Product was deleted successfully!`, data });
    });
};

exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    Product.updateById(
        req.body.params.productId,
        new Product(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Customer with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Customer with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.findOne = (req, res) => {
    Product.findBySku(req.params.sku, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found warehouse with id ${req.params.sku}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving warehouse with id " + req.params.sku
                });
            }
        } else res.send(data);
    });
};

