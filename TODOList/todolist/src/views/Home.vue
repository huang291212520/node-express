<template>
    <div class="home container">
        <div class="blank"></div>
        <h1 class="title">TODO LIST</h1>
        <div class="top input-group mb-3">
            <input type="text"
                   v-model="inputstr"
                   class="form-control"
                   placeholder="请输入代办事项"
                   aria-label="Recipient's username"
                   aria-describedby="basic-addon2">
            <div class="input-group-append"
                 @click="add">
                <span class="input-group-text">add thing</span>
            </div>
        </div>
        <div class="centerbox">
            <div class="list">
                <table class="table">
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>描述</th>
                            <th>时间</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in list"
                            :key='index'>
                            <th>{{ index + 1 }}.</th>
                            <th>{{ item.dothing }}</th>
                            <th>{{ item.time }}</th>
                            <th @click="del(item.id)">删除</th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <pageComponent></pageComponent>
    </div>
</template>

<script>
// @ is an alias to /src
import pageComponent from '../components/pageComponent'
export default {
    name: "home",
    data () {
        return {
            name: "",
            list: [],
            inputstr: '',
            url: 'http://localhost:3000',
            maxpage:1,
            page:1
        };
    },
    methods: {
        del (aa) {
            let that = this;
            this.layer.confirm('确定要删了吗', {
                btn: ['删了', '不删'] //按钮
            }, function () {
                that.axios.post(that.url + '/delitem', { id: aa })
                    .then(res => {
                        window.console.log(res)
                        if (res.data.code == 200) {
                            that.inputstr = ''
                            that.getlist()
                            that.layer.closeAll();
                            that.layer.msg('删完了')
                        } else {
                            that.layer.msg('没删掉')
                        }
                    })
            })
        },
        add () {
            if (this.inputstr) {
                this.axios.post(this.url + '/addlist', { thing: this.inputstr })
                    .then(res => {
                        window.console.log(res)
                        if (res.data.code == 200) {
                            this.inputstr = ''
                            this.getlist()
                            this.layer.msg('添加成功')
                        } else {
                            alert('插入失败:' + res.msg)
                        }
                    })

            }
        },
        getlist (clear) {
            this.axios.post(this.url,{page:this.page,count:5})
                .then(res => {
                    if(clear){
                        this.list = []
                    }                    
                    this.list = res.data
                })
        },
        jump(num){
            this.page = num
            this.getlist('clear');
        }
    },
    mounted () {
        this.getlist()
    },
    components: {
        pageComponent
    }
};
</script>
<style scoped lang='less'>
.top {
    margin: 1.25rem auto;
}
.blank {
    height: 2.5rem;
}
</style>