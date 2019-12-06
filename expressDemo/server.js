var express = require('express');

var bodyparse = require('body-parser')

var mysql = require('mysql');

var moment = require('moment')

var connection = mysql.createConnection({
    hots: 'localhost',
    user: 'roothuang',
    password: 'huang123',
    database: 'myDB'
})
connection.connect();

// connection.query("SELECT * FROM `todothing` WHERE id>0", (req, res) => {
//     console.dir(res)
// })

var app = express();

app.all("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
})

app.use(bodyparse.urlencoded({
    extended: true
}))

app.use(bodyparse.json())

var indexModule = require('./routers/index');

indexModule(app, connection, moment);

app.listen(3000);

console.log('启动成功')