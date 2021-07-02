const sql = require("./db.js");
const crypto = require('crypto');
// 添加「utf-8」避免出现中文加密不致的情况 注：一个crypto实例只能调用一次
const md5Sign = function (data) {
  let md5 = crypto.createHash('md5').update(data, 'utf-8').digest('hex');
  return md5;
}

// constructor
const Customer = function (customer) {
  this.username = customer.username;
  this.userpwd = customer.userpwd;
};
Customer.login = (newCustomer, result) => {
  sql.query(`select * from ci_admin where username='${newCustomer.username}'`, (err, data) => {
    if (err) {
      result(null, { err: 1, msg: '链接数据库失败' });
    } else {
      if (data.length == 0) {
        result(null, { err: 1, msg: '该用户不存在' });
      } else {
        console.log(data[0].userpwd, md5Sign(newCustomer.userpwd));

        if (data[0].userpwd == md5Sign(newCustomer.userpwd)) {
          result(null, { code: 200, msg: '登陆成功', result: data[0] });
        } else {
          result(null, { err: 1, msg: '用户名或密码错误' });
        }
      }
    }
  })
};

Customer.create = (newCustomer, result) => {
  sql.query("INSERT INTO customers SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created customer: ", { id: res.insertId, ...newCustomer });
    result(null, { id: res.insertId, ...newCustomer });
  });
};

Customer.findById = (customerId, result) => {
  sql.query(`SELECT * FROM customers WHERE id = ${customerId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found customer: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Customer.getAll = result => {
  sql.query("SELECT * FROM customers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};

Customer.updateById = (id, customer, result) => {
  sql.query(
    "UPDATE customers SET email = ?, name = ?, active = ? WHERE id = ?",
    [customer.email, customer.name, customer.active, id],
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

      console.log("updated customer: ", { id: id, ...customer });
      result(null, { id: id, ...customer });
    }
  );
};

Customer.remove = (id, result) => {
  sql.query("DELETE FROM customers WHERE id = ?", id, (err, res) => {
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

    console.log("deleted customer with id: ", id);
    result(null, res);
  });
};

Customer.removeAll = result => {
  sql.query("DELETE FROM customers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} customers`);
    result(null, res);
  });
};

module.exports = Customer;
