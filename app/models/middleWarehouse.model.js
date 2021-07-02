const sql = require("./db.js");


// constructor
const MiddleWarehouse = function (middleWarehouse) {
    this.warehouseId = middleWarehouse.warehouseId;
    this.productId = middleWarehouse.productId;
    this.productNumber = middleWarehouse.productNumber;
};


MiddleWarehouse.create = (newMiddleWarehouse, result) => {
    sql.query("INSERT INTO warehouseconcatproduct SET ?", newMiddleWarehouse, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, { code: 200, msg: '产品新增成功' });
    });
};



module.exports = MiddleWarehouse;
