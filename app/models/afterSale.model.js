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

AfterSale.getAll = (sku,pageOption, result) => {
    let mySql = sku == undefined ?`select * from my_aftersale where  id >= (select id from my_aftersale order by id limit ${pageOption.pageNo}, 1) ORDER BY saleDate DESC limit ${pageOption.pageSize}`:`select * from my_aftersale where sku='${sku}'`
    sql.query(mySql, (err, rows) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        sql.query(`select COUNT(id) as total from my_aftersale`, (err, row1) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            result(null, { code: 200, data: {rows,total:row1[0]['total']} });
        });
    });
};

module.exports = AfterSale;
