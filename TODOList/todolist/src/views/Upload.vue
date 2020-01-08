<template>
    <div class="upload container">
        <div class="blank"></div>
        <h1 class="title">上传图片</h1>
        <div class="uploadbox">
            <el-upload
                    class="upload-demo"
                    multiple
                    ref="upload"
                    :action="url"
                    accept="image/*"
                    drag
                    :autoUpload="autoload"
                    list-type="picture"
                    :file-list="fileList"
            >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">
                    只能上传jpg/png的文件，且不超过500kb
                    <el-button type="info" @click="clear">全部删除</el-button>
                    <el-button type="primary" @click="startUpload">开始上传</el-button>
                </div>
            </el-upload>
        </div>

    </div>
</template>

<script>
    export default {
        name: "upload",
        data(){
            return{
                fileList:[
                ],
                autoload:false,
                url:''

            }
        },
        mounted(){
            this.url = this.posturl+'/upload'
        },
        methods:{
            clear(){
                this.fileList = []
            },
            startUpload(){
                this.$refs.upload.submit();
            }
        }
    }
</script>

<style scoped lang="less">

    .title {
        color: #fff;
    }
    .uploadbox{
        margin-top: 2rem;
        /deep/
        .el-upload-dragger{
            width: 100%;
            height: 20rem;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
        }
        /deep/ .el-upload__tip{
            color: #fff;
            text-align: right;
        }
        /deep/ .el-upload{
            width: 100%;
        }
        /deep/ .el-upload-list{
            display: flex;
            flex-flow: wrap;
            li{
                width: 19%;
                margin: 1% 1.25% 0 0;
                color: #fff;
                line-height: 2.5;
                &:nth-child(5n){
                    margin-right: 0;
                }
                .el-upload-list__item-name{
                    color: #606266;
                }
                i{
                    color: #fff;
                }
                &:hover{
                    color: #999;
                    i{
                        color: #999;
                    }
                }
            }
            .el-upload-list__item{
                .el-icon-close{
                    top: 0;
                    bottom: 0;
                    margin: auto;
                    line-height: 2.5;
                }
            }
        }
    }

</style>