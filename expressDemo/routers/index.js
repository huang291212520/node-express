module.exports = (app, connection, moment) => {
    /**
     * @Description: get home list
     * @author: huang
     * @date : 2019/12/12
     */
    app.post('/', (req, res) => {
        let start = req.body.count * (req.body.page-1);
        var body = {};
        var sql1 = 'SELECT COUNT(*) AS allnum FROM `todothing`;'
        var sql2 = "SELECT * FROM `todothing` WHERE id>0 ORDER BY `id` DESC LIMIT "+start+","+req.body.count
        connection.query(sql1+sql2,(err,result)=>{
            if(err){
                throw err
            }else{
                body.count = result[0][0].allnum
                body.page = Number(req.body.page)
                body.total_page = Math.ceil(result[0][0].allnum / req.body.count)
                for(s in result[1]){
                    result[1][s].time = moment(result[1][s].time).format('YYYY-MM-DD HH:mm:ss')
                }
                body.list = result[1]
                res.send(body)
            }
        })
    })
    /**
     * @Description: add thing
     * @author: huang
     * @date : 2019/12/12
     */
    app.post('/addlist', (req, res) => {
        connection.query('INSERT INTO `todothing`(`dothing`) VALUES ("' + req.body.thing + '")', (dreq, dres) => {
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
    /**
     * @Description: del item
     * @author: huang
     * @date : 2019/12/12 0012
     */
    app.post('/delitem', (req, res) => {
        connection.query("DELETE FROM `todothing` WHERE id='" + req.body.id + "'", (dreq, dres) => {
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

    app.post('/edit',(req,res)=>{
        if (!req.body.id){
            res.send({
                code:0,
                msg:'没有指定修改项'
            })
            return
        }
        if (!req.body.dothing){
            res.send({
                code:0,
                msg:'内容不能为空'
            })
            return
        }
        var sql = 'UPDATE todothing SET `dothing` = "'+req.body.dothing+'" WHERE id = '+req.body.id
        connection.query(sql,(dreq,dres)=>{
            if(dres){
                res.send({
                    code:200,
                    msg:'修改成功'
                })
            }else{
                res.send({
                    code:0,
                    msg:'修改失败'
                })
            }
        })
    })
}