<template>
    <Loadmore :top-method="loadTop" 
            ref="loadermore" 
            :bottom-all-loaded="allLoaded" 
            :bottom-method="loadBottom" >
        <div class="container">
            <MySwiper/>
            <div class="content">
                <ContentItem v-for="(item,index) in contentData" :options="item" :key="index"/>
            </div>
        </div>
    </Loadmore>
    
</template>

<script>
    import MySwiper from '@/components/my-swiper';
    import ContentItem from './components/contentItem';
    import moment from 'moment';
    import { Loadmore } from 'mint-ui';


    export default {
        name:'index',   
        components:{
            MySwiper,
            ContentItem,
            Loadmore
        },
        data(){
            return{
                contentData:[],
                qureyData:{
                    pn:1,
                    booksSize:2,
                    size:2
                },
                allLoaded: false
            }
        },
        methods:{
            getContent(){
                //精准控制
                return new Promise((resolve)=>{
                     this.$axios.get(this.$api.getContent,/*传参 */{
                    params:this.qureyData
                }).then(res=>{
                    let resData=res.data;                    
                    //判断是否加载完成
                    if(res.length<=this.qureyData.size){
                        this.allLoaded=true
                    }

                    resData=resData.map(item=>{
                        item.books=item.books.map(it=>{
                            it.updateTime=moment(it.updataTime).format('YYYY年MM月DD日')
                            return it;
                        })
                        return item
                    })
                    // this.contentData=[].concat(this.contentData,resData);//es5数组拼接
                    this.contentData=[...this.contentData,...resData]//es6拼接
                    resolve()
                })
                })
               
            },
            loadTop (){
                this.qureyData={
                    pn:1,
                    booksSize:4,
                    size:4
                }
                //上拉刷新重置参数
                this.allLoaded=false

                 this.getContent().then(()=>{
                    this.$refs.loadmore.onTopLoaded(); 
            })
            },
            loadBottom (){
                this.qureyData={
                    pn:this.qureyData.pn+1,
                    booksSize:2,
                    size:2
                }
                this.getContent().then(()=>{
                    this.$refs.loadmore.onBottomLoaded(); 
            })
            }
        },
        created(){
            this.getContent()
        }

    }
</script>

<style scoped lang="scss">
    @import '../../globalCss/px2-rem';
    .container {
        padding: px-to-rem(18);
        padding-bottom: 60px;
  }    
</style>