const sql = require("./db.js");
// constructor
const LogisticsStatistics = function (logisticsStatistics) {
    this.trackTime = logisticsStatistics.trackTime;
    this.trackText = logisticsStatistics.trackText;
    this.startTime = logisticsStatistics.startTime;
    this.trackingNumber = logisticsStatistics.trackingNumber;
    this.orderNumber = logisticsStatistics.orderNumber;
    this.sku = logisticsStatistics.sku;
    this.status = logisticsStatistics.status;
};

LogisticsStatistics.getAll = (keyValue, result) => {
    let mySql = keyValue == undefined ? `SELECT * FROM my_tracking` : `SELECT * FROM my_tracking a WHERE 1=1 and (a.trackingNumber ='${keyValue}' or a.orderNumber ='${keyValue}' or a.sku ='${keyValue}')`
    sql.query(mySql, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, { code: 200, data: res });
            return;
        } else {
            result(null, { code: 200, data: [] });
            return;
        }
    });
};


module.exports = LogisticsStatistics;
