const sql = require("./db.js");


// constructor
const AfterSale = function (afterSale) {
    this.account = afterSale.account;
    this.orderNumber = afterSale.orderNumber;
    this.sku = afterSale.sku;
    this.saleDate = afterSale.saleDate;
    this.sendWarehouse = afterSale.sendWarehouse;
    this.backWarehouse = afterSale.backWarehouse;
    this.backNumber = afterSale.backNumber;
    this.flowOrderNumber = afterSale.flowOrderNumber;
    this.productImage = afterSale.productImage;
    this.remark = afterSale.remark;


};


AfterSale.create = (newAfterSale, result) => {
    sql.query("INSERT INTO my_aftersale SET ?", newAfterSale, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, { code: 200, msg: '售后信息新增成功' });
    });
};

AfterSale.getAll = result => {
    sql.query("SELECT * FROM my_aftersale", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, { code: 200, data: res });
    });
};

module.exports = AfterSale;
