const MenuList = require("../models/getMenuList.model");

exports.findAll = (req, res) => {
    MenuList.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Warehouse."
            });
        else res.send(data);
    });
};






