<template>
    <div class="home container">
        <div class="blank"></div>
        <h1 class="title">待办事项</h1>
        <div class="top input-group mb-3">
            <input type="text"
                   v-model="inputstr"
                   class="form-control"
                   placeholder="请输入代办事项"
                   aria-label="Recipient's username"
                   aria-describedby="basic-addon2">
            <div class="input-group-append"
                 @click="add">
                <span class="input-group-text">添加</span>
            </div>
        </div>
        <div class="centerbox">
            <tableComponent
                    :columns="columns"
                    :dataList="list"
            ></tableComponent>
        </div>

        <pageComponent :count="count" :size="pagesize" v-if="list.length != 0" @getpage='getpage'></pageComponent>
    </div>
</template>

<script>
    // @ is an alias to /src
    import pageComponent from '../components/pageComponent'
    import tableComponent from '../components/tableComponent'
    import moment from 'moment'
    export default {
        name: "todothing",
        data() {
            return {
                name: "",
                list: [],
                inputstr: '',
                maxpage: 1,
                page: 1,
                pagesize: 8,
                count: 1,
                oldval:'',
                editid:'',
                editstr:'',

                fileList:[
                ],
                autoload:false,
                url:'',


                columns:[
                    {
                        name:'序号',
                        value:'id',
                        seq:true
                    },
                    {
                        name:'日期',
                        value:'time',
                        w:(row)=>{
                            return row.time ? moment(new Date(row.time)).format('YYYY-MM-DD HH:mm:ss') : ''
                        }
                    },
                    {
                        name:'事项',
                        value:'dothing'
                    },
                    {
                        name:'操作',
                        type:'action',
                        action:[
                            {
                                name:'删除',
                                type:'danger',
                                action:(row)=>{
                                    this.del(row)
                                }
                            },
                            {
                                name:'修改内容',
                                type:'primary',
                                action:(row)=>{

                                }
                            }
                        ]
                    }
                ]
            };
        },
        filters: {},
        methods: {
            clear(){
                this.fileList = []
            },
            startUpload(){
                this.$refs.upload.submit();
            },
            del(data) {
                this.$confirm('确定要删了吗？', '提示', {
                    confirmButtonText: '删了吧',
                    cancelButtonText: '再等等',
                    type: 'warning'
                })
                    .then(() => {
                        this.axios.post(this.posturl + '/delitem', {id: data.id})
                            .then(res => {
                                if (res.data.code === 200) {
                                    this.inputstr = '';
                                    this.getlist();
                                    this.$message({
                                        type:'success',
                                        message:'删完了'
                                    })
                                } else {
                                    this.$message('没删掉')
                                }
                            })
                    })
            },
            add() {
                if (this.inputstr) {
                    this.axios.post(this.posturl + '/addlist', {thing: this.inputstr})
                        .then(res => {
                            window.console.log(res)
                            if (res.data.code == 200) {
                                this.inputstr = ''
                                this.getlist()
                                this.$message({
                                    type:'success',
                                    message:'添加成功'
                                })
                            } else {
                                alert('插入失败:' + res.msg)
                            }
                        })

                }
            },
            edit(index,scope){
                this.oldval = this.list[index].dothing
                this.editid = this.list[index].id
                this.editstr = this.list[index].dothing
            },
            save(index){
                this.editid = this.list[index].id
                this.axios.post(this.posturl+'/edit',{
                    id:this.editid,
                    dothing:this.editstr
                })
                    .then(res=>{
                        if(res.data.code==200){
                            this.$message({
                                type:'success',
                                message:'修改成功'
                            })
                            this.getlist()
                        }else{
                            this.$message({
                                type:'error',
                                message:res.msg
                            })
                        }
                        console.log(res);
                    })
                this.editid = ''
            },
            getpage(page) {
                this.page = page
                this.getlist()
            },
            getlist(clear) {
                this.axios.post(this.posturl, {page: this.page, count: this.pagesize})
                    .then(res => {
                        if (clear) {
                            this.list = []
                        }
                        this.count = res.data.count
                        this.list = res.data.list
                    })
            },
            jump(num) {
                this.page = num
                this.getlist('clear');
            }
        },
        mounted() {
            this.getlist();
            this.url = this.posturl+'/upload'
        },
        components: {
            pageComponent,
            tableComponent
        }
    };
</script>
<style scoped lang='less'>
    .centerbox {
        margin-bottom: 2rem;
    }

    .top {
        margin: 1.25rem auto;
    }

    .title {
        color: #fff;
    }

    .list {
        color: #fff;
        font-size: 0.16rem;

        td, tr {
            color: #fff;
        }
    }
</style>
