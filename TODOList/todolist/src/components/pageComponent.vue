<template>
    <div class="container flex">
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item" :class="currentpage == 1 ? 'disabled' : '' " @click="prevPage">
                    <a class="page-link" href="#">上一页</a>
                </li>
                <li class="page-item" :class="currentpage == (index+1) ? 'active' :'' " v-for="(item,index) in pagelist" :key="index" @click='changePage(index+1)'>
                    <a class="page-link" href="#">{{ index+1 }}</a>
                </li>
                <li class="page-item" :class="currentpage == pagelist.length ? 'disabled' : '' " @click="nextPage"><a class="page-link" href="#">下一页</a></li>
            </ul>
        </nav>
    </div>
</template>

<script>
// @ is an alias to /src
export default {
    data () {
        return {
           pagenum:1,
           pagelist:[],
           currentpage:1
        };
    },
    props:{
        count:{
            default:1,
            required:true
        },
        size:{
            default:5,
            required:true
        }
    },
    methods: {
      prevPage(){
          if(this.currentpage != 1){
              console.log(this.currentpage);
              this.currentpage--;
              console.log(this.currentpage);
              this.changePage(this.currentpage)
          }
      },
        nextPage: function () {
            if (this.currentpage != this.pagelist.length) {
                console.log(this.currentpage);
                this.currentpage++
                console.log(this.currentpage);
                this.changePage(this.currentpage)
            }
        },
      changePage(page){
          console.log(this.currentpage);
          this.$emit('getpage',page);
          this.currentpage = page
      }
    },
    mounted () {
        this.pagenum = Math.ceil(this.count / this.size);
        for (let i = 0; i < this.pagenum; i++) {
            this.pagelist.push('i')
        }
    },
    components: {}
};
</script>
<style scoped lang='less'>
    .flex{
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.16rem;
    }
</style>