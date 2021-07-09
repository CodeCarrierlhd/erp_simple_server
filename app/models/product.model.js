const sql = require("./db.js");


// constructor
const Product = function (product) {
    this.mpn = product.mpn;
    this.soldSeparately = product.soldSeparately;
    this.productName = product.productName;
    this.mainColor = product.mainColor;
    this.mainMaterial = product.mainMaterial;
    this.productSize = product.productSize;
    this.manualBook = product.manualBook;
    this.nowPrice = product.nowPrice;
    this.showPrice = product.showPrice;
    this.productTypeId = product.productTypeId;
    this.length = product.length;
    this.width = product.width;
    this.height = product.height;
    this.weight = product.weight;
    this.mainImg = product.mainImg;
    this.desProduct = product.desProduct;
    this.materailImage = product.materailImage;
    this.manualImage = product.manualImage;
    this.fileUpload = product.fileUpload;
};


Product.create = (newProduct, result) => {
    sql.query("INSERT INTO my_goods SET ?", newProduct, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, { code: 200, msg: '产品新增成功' });
    });
};
Product.getAll = result => {
    sql.query("SELECT * FROM my_goods WHERE statu=1", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, { code: 200, data: res });
    });
};
Product.getWarehouseAllProduct = (sku, result) => {
    let mySql = sku == undefined ? 
    `SELECT sum(a.productNumber) productNumber,c.mainImg,c.productName,c.mpn from warehouseconcatproduct a 
     JOIN my_warehouse b ON a.warehouseId=b.id 
     JOIN my_goods c ON a.productId=c.id 
    WHERE b.statu='1' AND c.statu='1' 
    group by c.mainImg,c.productName,c.mpn` 
    :
    `SELECT sum(a.productNumber) productNumber,c.mainImg,c.productName,c.mpn from warehouseconcatproduct a 
     JOIN my_warehouse b ON a.warehouseId=b.id 
     JOIN my_goods c ON a.productId=c.id 
    WHERE b.statu='1' AND c.statu='1' and c.mpn='${sku}' GROUP BY c.mpn`
    
    sql.query(mySql, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, { code: 200, data: res });
    });
};

Product.remove = (ids, result) => {
    sql.query(`UPDATE my_goods set statu=0 WHERE id IN (${ids})`, (err, res) => {
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

Product.updateById = (id, product, result) => {
    sql.query(
        "UPDATE my_goods SET mpn = ?, soldSeparately = ?, productName = ?,mainColor = ?, mainMaterial = ?, productSize = ?,manualBook = ?, nowPrice = ?, showPrice = ?,productTypeId = ?, length = ?, width = ?,height = ?, weight = ?, mainImg = ?,desProduct = ?, materailImage = ?, manualImage = ?,fileUpload=? WHERE id = ?",
        [product.mpn, product.soldSeparately, product.productName, product.mainColor, product.mainMaterial, product.productSize, product.manualBook, product.nowPrice, product.showPrice, product.productTypeId, product.length, product.width, product.height, product.weight, product.mainImg, product.desProduct, product.materailImage, product.manualImage, product.fileUpload, id],
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

Product.findBySku = (sku, result) => {
    sql.query(`SELECT * FROM my_goods WHERE statu=1 and mpn='${sku}'`, (err, res) => {
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


module.exports = Product;
