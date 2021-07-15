const express = require("express");
const path = require('path');
const fs = require('fs');
const multer = require('multer')
const bodyParser = require("body-parser");
const { log } = require("console");
const app = express();

var storage = multer.diskStorage({
  //设置上传后文件路径，uploads文件夹会自动创建。
  destination: function (req, file, cb) {
    cb(null, './app/static')
  },
  //给上传文件重命名，获取添加后缀名
  filename: function (req, file, cb) {
    //获取格式
    var fileFormat = (file.originalname).split(".");
    if (file.fieldname == 'img') {
      cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }else{
      cb(null, req.body.filename +"." + fileFormat[fileFormat.length - 1]);
    }
  }
});
//添加配置文件到muler对象。
var upload = multer({
  storage: storage
});


// var upload = multer({ dest: './app/static' });
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// 配置静态资源目录 整一个文件夹 通过域名能访问
app.use('/imgs', express.static(path.join(__dirname, '/app/static')));

//路由配置
// const upload = require('./app/controllers/upload');
// app.use('/upload', upload)
//解决跨域问题
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});
// 单图上传
app.post('/uploadImg', upload.single('image'), function (req, res, next) {
  var file = req.file;
  // console.log(file);
  // console.log('文件类型：%s', file.mimetype);
  // console.log('原始文件名：%s', file.originalname);
  // console.log('文件大小：%s', file.size);
  // console.log('文件保存路径：%s', file.path);
  res.send({ ret_code: '0', filename: file.filename });
});

// 单图上传
app.post('/uploadFile', upload.single('file'), function (req, res, next) {
  var file = req.file;  
  // console.log('文件类型：%s', file.mimetype);
  // console.log('原始文件名：%s', file.originalname);
  // console.log('文件大小：%s', file.size);
  // console.log('文件保存路径：%s', file.path);
  res.send({ ret_code: '0', filename: file.filename });
});
require("./app/routes/customer.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
