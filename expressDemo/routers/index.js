module.exports = (app, database, moment) => {
    app.post('/', (req, res) => {
        let start;
        let allcount;
        var body = {};
        var list = [];
        req.body.page == 1 ? start = 0 : start = req.body.count * req.body.page
        var sql1 = 'SELECT COUNT(*) AS allnum FROM `todothing`;'
        var sql2 = "SELECT * FROM `todothing` WHERE id>0 ORDER BY `id` DESC LIMIT "+start+","+req.body.count
        console.dir(sql1+sql2)
        database.query("SELECT COUNT(*) AS allnum FROM `todothing`",(dreq,dres)=>{
            console.dir(dres)
        })
        database.query(sql2,(dreq,dres)=>{
            console.dir(dres)
        })
        res.send(body)
    })
    app.post('/addlist', (req, res) => {
        console.dir(req.body, 'query')
        database.query('INSERT INTO `todothing`(`dothing`) VALUES ("' + req.body.thing + '")', (dreq, dres) => {
            console.dir(dres)
            console.dir(dreq)
            if (dres) {
                res.send({
                    code: 200,
                    msg: '插入成功'
                })
            } else {
                res.send({
                    code: 0,
                    msg: "插入失败"
                })
            }
        })
    })
    app.post('/delitem', (req, res) => {
        database.query("DELETE FROM `todothing` WHERE id='" + req.body.id + "'", (dreq, dres) => {
            if (dres) {
                res.send({
                    code: 200,
                    msg: '删除成功'
                })
            } else {
                res.send({
                    code: 0,
                    msg: '查询失败'
                })
            }
        })
    })
}