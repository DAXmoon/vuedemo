<template>
    <div>
        <swiper :options="swiperOption" ref="mySwiper">
            <!-- slides swiperOption这个是需要写的内容 -->
            <swiper-slide v-for="(item,index) in swiperData" :key="index">
                <router-link :to="{name:'details',params:{id:item.book._id}}" class="swiper-img-wrap">
                    <img :src="item.img" :alt="item.img" class="swiper-img">
                    <div class="title">
                        {{item.title}}
                    </div>
                </router-link>
            </swiper-slide>

            <!-- Optional controls -->
            <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
    import 'swiper/dist/css/swiper.css'
    import {swiper,swiperSlide} from 'vue-awesome-swiper'
    export default {
        name:'index',
        data(){
            return{
                swiperOption:{
                    //分页器
                    pagination:{
                        //绑定dom元素
                        el:'.swiper-pagination'
                    }
                },
                swiperData:[]   
            }
            
        },
        components:{
            swiper,
            swiperSlide
        },
        methods:{
            getSwiper(){
                // 引入封装的axios包后就不用重复引入接口了
                this.$axios.get(this.$api.getSwiper).then(res=>{
                    this.swiperData=res.data;

                })
            }
        },
        created(){
            this.getSwiper()
        }
    }
</script>

<style scoped lang='scss'>
@import '../../globalCss/px2-rem';
    .swiper-img-wrap{
        display: block;
        width: 100%;
        position: relative;
        color: rgba(255,255,255,.9);
        text-decoration: none;
    .swiper-img{
        height: px-to-rem(400);
    }
    .title{
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        padding: 4px;
        height: 20px;
        background: rgba(0,0,0,.5);
    }
  }
</style>