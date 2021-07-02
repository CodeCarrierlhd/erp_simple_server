const sql = require("./db.js");


// constructor
const PartsStatistics = function (partsStatistics) {
    this.account = partsStatistics.account;
    this.saleDate = partsStatistics.saleDate;
    this.orderNumber = partsStatistics.orderNumber;
    this.sku = partsStatistics.sku;
    this.wayType = partsStatistics.wayType;
    this.wayPart = partsStatistics.wayPart;
    this.remark = partsStatistics.remark;
};


PartsStatistics.create = (newPartsStatistics, result) => {
    sql.query("INSERT INTO my_components SET ?", newPartsStatistics, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, { code: 200, msg: '数据新增成功' });
    });
};
PartsStatistics.getAll = result => {
    sql.query("SELECT * FROM my_components", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, { code: 200, data: res });
    });
};


PartsStatistics.updateById = (id, partsStatistics, result) => {
    sql.query(
        "UPDATE my_components SET account = ?, saleDate = ?, orderNumber = ?,sku = ?, wayType = ?, wayPart = ?,remark = ?WHERE id = ?",
        [partsStatistics.account, partsStatistics.saleDate, partsStatistics.orderNumber, partsStatistics.sku, partsStatistics.wayType, partsStatistics.wayPart, partsStatistics.remark, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Customer with the id
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, { code: 200, data: res });
        }
    );
};

module.exports = PartsStatistics;
