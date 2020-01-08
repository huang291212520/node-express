<template>
    <div class="list ivu-scroll-container">
        <el-scrollbar
            tag="div"
            class="adi-scrollbar"
        >
            <div class="item" v-for="(item,index) in imglist" :key="index">
                <el-image :src="item" :lazy="true" :preview-src-list="imglist"></el-image>
                <!--<div class="coverbox" @click="prev(index)">-->
                    <!--<i class="el-icon-zoom-in">预览</i>-->
                <!--</div>-->
            </div>
        </el-scrollbar>
    </div>
</template>

<script>
    export default {
        name: "Imgwall",
        data(){
            return{
                imglist:[
                    'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
                    'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
                    'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
                    'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
                    'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
                    'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
                    'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
                    'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
                    'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg'

                ],
                d:'list'
            }
        },
        methods:{
            prev(index){

            }
        },
        mounted() {

        }
    }
</script>

<style scoped lang="less">
    .list{
        height: calc(100% - 27px);
        overflow: auto;
        /deep/
        .el-scrollbar{
            height: 100%;
            .el-scrollbar__wrap{
                overflow-x: hidden;
            }
            .el-scrollbar__thumb{
                background: rgba(162, 23, 23, 0.46);
            }
        }
        /deep/
        .el-scrollbar__view{
            box-sizing: border-box;
            padding: 12px;
            font-size: 0;
            display: grid;
            grid-template-columns: repeat(auto-fill,19%);
            grid-gap: 3.25% 1.25%;
            .item{
                width: 100%;
                display: inline-block;
                position: relative;
                height: 100%;
                .coverbox{
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    z-index: 10;
                    left: 0;
                    top: 0;
                    color: #fff;
                    background: rgba(103, 194, 58, 0.32);
                    font-size: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: .2s;
                    opacity: 0;
                }
                &:hover{
                    .coverbox{
                        transition: .2s;
                        opacity: 1;
                    }
                }
                img{
                    border-radius: 4px;
                }
                .el-icon-circle-close{
                    color: #fff;
                }
            }
        }

    }
</style>