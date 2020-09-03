var mysql = require('mysql')

var connection = mysql.createPool({
    // hots: 'localhost',
    // user: 'huangzhanchuan',
    // password: 'huang584520',
    // database: 'huangzhanchuan',
    // connectionLimit:10,
    // multipleStatements:true,
    hots: 'localhost:8889',
    user: 'roothuang',
    password: 'huang123',
    database: 'todo',
    connectionLimit:0,
    multipleStatements:true
});

/**
 * @param sql
 * @param options 配置
 * @param callback
 */
connection.query = (sql,options,callback)=>{
    connection.getConnection((err,conn)=>{
        if(err){
            console.log(err);
            callback && callback(err,null,null)
        }else{
            conn.query(sql,options,(error,results)=>{
                connection.release()
                callback(error,results)
            })
        }
    })
}

module.exports = connection
