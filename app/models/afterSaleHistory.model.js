const sql = require("./db.js");


// constructor
const AfterSaleHistory = function (afterSaleHistory) {
    this.afterSaleId = afterSaleHistory.afterSaleId;
    this.newOrderNumber = afterSaleHistory.newOrderNumber;
    this.changePart = afterSaleHistory.changePart;
    this.changeAccount = afterSaleHistory.changeAccount;
    this.changeDate = afterSaleHistory.changeDate;

};


AfterSaleHistory.create = (newAfterSaleHistory, result) => {
    sql.query("INSERT INTO my_salehistory SET ?", newAfterSaleHistory, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, { code: 200, msg: '更换配件新增成功' });
    });
};
AfterSaleHistory.findById = (afterSaleId, result) => {
    sql.query(`SELECT * FROM my_salehistory WHERE afterSaleId = '${afterSaleId}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        // not found saleHistory with the id
        result(null, { code: 200, data: res });
    });
};


module.exports = AfterSaleHistory;
