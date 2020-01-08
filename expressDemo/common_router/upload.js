module.exports = (app,_query,moment) =>{
    var fs = require('fs')

    var multer = require('multer')

    var _time = (new Date()).valueOf()
    _time = moment(_time).format('YYYYMMDD')

    var storage = multer.diskStorage({
        //这里destination是一个字符串
        destination: './upload/',
        filename: function (req, file, cb){
            //自定义设置文件的名字
            timestamp = new Date().getTime();
            filename = timestamp + '.' + file.originalname.split('.')[1];
            cb(null, filename)
        }
    });

    var upload = multer({
        storage: storage
    });

    app.post('/upload',upload.any(),(req,res,next)=>{
        if(req.method=='POST'){
            if(req.files[0]){

            }else{
                res.send({
                    code:0,
                    msg:'请上传文件'
                })
            }
            var fileName = (new Date()).valueOf()
            var _name = req.files[0].originalname
            var newName = _name.split('.')[_name.split('.').length - 1];
            var newdir = './upload/'+_time+'/'+fileName+'.'+newName
            var olddir = req.files[0].path
            fs.stat(newdir,(err)=>{
                if(err){
                    fs.mkdir('./upload/'+_time,(mkdir)=>{
                        fs.rename(olddir,newdir,(rename_err)=>{
                            if(rename_err){
                                res.send({
                                    code:0,
                                    msg:'上传失败'
                                })
                            }else{
                                res.send({
                                    code:200,
                                    msg:'上传成功',
                                    filePath: newdir
                                })
                            }
                        })
                    })
                }else{
                    fs.rename(olddir,newdir,(rename_err)=>{
                        if(rename_err){
                            res.send({
                                code:0,
                                msg:'上传失败'
                            })
                        }else{
                            res.send({
                                code:200,
                                msg:'上传成功',
                                filePath: newdir
                            })
                        }
                    })
                }
            })
        }else if(req.method=='OPTIONS'){
            res.send({
                code:200
            })
        }
    })
}

