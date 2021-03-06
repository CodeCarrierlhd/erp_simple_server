const sql = require("./db.js");
// constructor
const Warehouse = function (warehouse) {
    this.cabinNumber = warehouse.cabinNumber;
    this.containerNumber = warehouse.containerNumber;
    this.wareHouseModel = warehouse.wareHouseModel;
    this.sealPart = warehouse.sealPart;
    this.deliveryDate = warehouse.deliveryDate;
    this.arrivalTime = warehouse.arrivalTime;
    this.relArrivedTime = warehouse.relArrivedTime;
    this.deliveryStartDate = warehouse.deliveryStartDate;
    this.remark = warehouse.remark;
    this.inWarehouse = warehouse.inWarehouse;
    this.warehouseType = warehouse.warehouseType;
    this.fileUpload = warehouse.fileUpload;

};

Warehouse.getAllWarehouse = (result) => {
    sql.query(`SELECT * FROM my_warehouse WHERE statu=1 and inWarehouse=2 ORDER BY arrivalTime ASC,id ASC`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, { code: 200, data: res });
    });
};

Warehouse.getAll = (pageOption,inWarehouse, result) => {
    sql.query(`select * from my_warehouse where  statu='1' AND inWarehouse=${inWarehouse} and id >= (select id from my_warehouse order by id limit ${(pageOption.pageNo-1)*pageOption.pageSize}, 1) limit ${pageOption.pageSize} `, (err, rows) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        sql.query(`select COUNT(id) as total from my_warehouse where  statu='1'`, (err, row1) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            result(null, { code: 200, data: {rows,total:row1[0]['total']} });
        });
    });
};
Warehouse.findById = (warehouseId, result) => {
    sql.query(`select wcp.warehouseId,wcp.productNumber,g.id,g.mainImg,g.mpn,g.productName from warehouseconcatproduct as wcp 
    LEFT JOIN my_goods as g on g.id=wcp.productId
    where wcp.warehouseId=${warehouseId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, { code: 200, data: res });
            return;
        }

        // not found warehouse with the id
        result({ kind: "not_found" }, null);
    });
};

Warehouse.findBySku = (sku,pageOption, result) => {
    sql.query(`SELECT * FROM my_warehouse WHERE id in (SELECT warehouseId FROM warehouseconcatproduct w,my_goods b WHERE w.productId=b.id AND b.mpn LIKE '%${sku}%') and statu=1 and id >= (select id from my_goods order by id limit ${(pageOption.pageNo-1)*pageOption.pageSize}, 1) limit ${pageOption.pageSize}`, (err, rows) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, { code: 200, data: {rows,total:rows.length} });
    });
};

Warehouse.findByType = (warehouse, result) => {
    let mySql = warehouse.warehouseType === 'all' ? `SELECT * FROM my_warehouse WHERE  inWarehouse=${warehouse.inWarehouse}` : `SELECT * FROM my_warehouse WHERE warehouseType= ${warehouse.warehouseType} and inWarehouse=${warehouse.inWarehouse}`
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

Warehouse.create = (newWarehouse, result) => {
    sql.query("INSERT INTO my_warehouse SET ?", newWarehouse, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, { code: 200, msg: '????????????', data: res });
    });
};


Warehouse.remove = (ids, result) => {
    sql.query(`UPDATE my_warehouse set statu=0 WHERE id IN (${ids})`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, { code: 200, data: res });
    });
};

Warehouse.updateById = (id, newWarehouse, result) => {

    sql.query(
        "UPDATE my_warehouse SET cabinNumber = ?, containerNumber = ?, wareHouseModel = ?,sealPart = ?, deliveryDate = ?, remark = ?,relArrivedTime = ?,deliveryStartDate=?,arrivalTime = ?,warehouseType=?, inWarehouse = ?,fileUpload=? WHERE id = ?",
        [newWarehouse.cabinNumber, newWarehouse.containerNumber, newWarehouse.wareHouseModel, newWarehouse.sealPart, newWarehouse.deliveryDate, newWarehouse.remark, newWarehouse.relArrivedTime,newWarehouse.deliveryStartDate,newWarehouse.arrivalTime, newWarehouse.warehouseType, newWarehouse.inWarehouse, newWarehouse.fileUpload, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Warehouse with the id
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, { code: 200, data: res });
        }
    );
};

module.exports = Warehouse;
