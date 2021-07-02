const sql = require("./db.js");


// constructor
const MenuList = function (menuList) {
    this.role_id = menuList.role_id;
    this.btn_code = menuList.btn_code;
};

MenuList.getAll = (role_id, result) => {
    sql.query(`SELECT * FROM menu_list role_id=${role_id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, { code: 200, data: res });
    });
};





module.exports = Product;
