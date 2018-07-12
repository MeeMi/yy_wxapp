<template>
    <div id="container">
      <div class="search-box">
        <search></search>
      </div>
        <div class="navbar-box">
          <select-tab :tabBar="tabBar" @switchTab="switchTab"></select-tab>
        </div>

        <swiper class="notes" >
          <swiper-item class="category">
              <scroll-view class="cate-box"  scroll-y>
                <notes-content :notes="notes"></notes-content>
              </scroll-view>
          </swiper-item>
        </swiper>
    </div>
</template>

<script>
import search from '@/components/Search'
import selectTab from '@/components/SelectTab'
import content from '@/components/Content'
import fly from '@/utils/fly'

export default {
  components: {
        search,
        selectTab,
        'notesContent':content   
     },
    data(){
        return{
          tabBar:[],
          notes:[]
        }
    },
    methods:{
      switchTab(index){
        for(let i in this.tabBar){
          this.tabBar[i].isSelected = parseInt(i) === index;
          if(this.tabBar[i].isSelected){
            this.notes = this.tabBar[i].content;
          }
        }
      }
    },
    created() {
      fly.get('tabBar#!method=get').then((res)=>{
            this.tabBar = res.data;
            this.switchTab(0);
          })
          .catch((e)=>{
            console.log(e)
          })
    }
}
</script>

<style scoped>
  #container{
    background: #f4f9fa;
    height: 100%;
  }
  .search-box{
    height: 97rpx;
    background: #fff;
    line-height: 97rpx;
  }
  .navbar-box{
    height: 80rpx;
    box-shadow: 0px 5px 5px -10px #f9f9f9 inset, 0px -5px 5px -10px #f9f9f9 inset;
    line-height: 80rpx;
  }
  .notes{
    height: 100%;
  }
</style>
