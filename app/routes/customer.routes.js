module.exports = app => {
  const customers = require("../controllers/customer.controller.js");
  const product = require("../controllers/product.controller");
  const warehouse = require("../controllers/warehouse.controller");
  const middleWareHouse = require("../controllers/middleWareHouse.controller");
  const afterSale = require("../controllers/afterSale.controller");
  const afterSaleHistory = require("../controllers/afterSaleHistory.controller");
  const partsStatistics = require("../controllers/partsStatistics.controller");
  const logisticsStatistics = require("../controllers/logisticsStatistics.controller");

  app.post("/addProduct", product.create);

  app.post("/addWarehouset", warehouse.create);
  app.post("/addComponents", partsStatistics.create);

  app.post("/addAfterSale", afterSale.create);
  app.post("/addAfterSaleHistory", afterSaleHistory.create);

  app.post("/addmiddleWareHouse", middleWareHouse.create);

  app.get("/productList", product.findAll);

  app.get("/logisticsStatisticsList", logisticsStatistics.findAll);

  app.get("/partsStatisticsList", partsStatistics.findAll);

  app.get("/afterSaleList", afterSale.findAll);

  //Customer login
  app.post("/login", customers.login);

  app.get("/warehouseList/:inWarehouse", warehouse.findAll);
  app.get("/allWarehouseList", warehouse.findAllWarehouse);

  app.get("/warehouse/:warehouseId", warehouse.findOne);

  app.get("/findWarehouseByType", warehouse.findOneByType);

  app.get("/saleHistoryList/:afterSaleId", afterSaleHistory.findOne);

  app.get("/findWarehouseBySku/:sku", warehouse.findOneBySku);

  app.put("/updateProduct", product.update);

  app.put("/updatePartsStatistics", partsStatistics.update);

  app.put("/updateWarehouse", warehouse.update);

  app.delete("/delWarehouse", warehouse.delete);

  app.delete("/delProduct", product.delete);


};
