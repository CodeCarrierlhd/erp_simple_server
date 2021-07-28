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
PartsStatistics.getAll = (pageOption,result) => {
    sql.query(`select * from my_components where id >= (select id from my_components order by id limit ${(pageOption.pageNo-1)*pageOption.pageSize}, 1) ORDER BY saleDate DESC limit ${pageOption.pageSize}`, (err, rows) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        sql.query(`select COUNT(id) as total from my_components`, (err, row1) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            result(null, { code: 200, data: {rows,total:row1[0]['total']} });
        });
    });
};


PartsStatistics.updateById = (id, partsStatistics, result) => {
    sql.query(
        "UPDATE my_components SET account = ?, saleDate = ?, orderNumber = ?,sku = ?, wayType = ?, wayPart = ?,remark = ? WHERE id = ?",
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
