<template>
    <div id="container">
      <div class="search-box">
        <search :placeholderText="placeholderText"></search>
      </div>
      <div class="navbar-box">
        <select-tab :tabBar="tabBar" @switchTab="switchTab"></select-tab>
      </div>
      <scroll-view class="cate-box"  scroll-y>
        <goods-content :notes="notes"></goods-content>
      </scroll-view>
      <div v-if="isLoading" class="Loading">正在加载...</div>
    </div>
</template>

<script>
import search from '@/components/Search'
import selectTab from '@/components/SelectTab'
import content from '@/components/Content'
import { GoodsTabbarData } from '@/api/mall'
import { mallSearch } from '@/api/search'

export default {
  components: {
        search,
        selectTab,
        'goodsContent':content   
     },
    data(){
        return{
          tabBar:[],
          notes:[],
          isLoading:true,
          hasMore:true,
          currentIndex:0,
          page:0
        }
    },
    computed:{
      placeholderText() {
        return mallSearch
      }
    },
    methods:{
      switchTab(index){
        this.currentIndex = index;
        this.notes = []
        this.page = 0;
        this.getList(this.page,4,index)
        this.currentIndex = index;
      },
      // page 最后一条是第几条，pageSize 每次传几个，tabCurrent当前第几个tab
      async getList(page,pageSize,tabCurrent,dataName){
          this.isLoading = true;
          this.hasMore = true;

          const data = await GoodsTabbarData();
          this.tabBar = data.data;          
          // 遍历数据
          for(let i in this.tabBar){
            this.tabBar[i].isSelected = parseInt(i) === tabCurrent;
            if(this.tabBar[i].isSelected){
              const notesContent = this.tabBar[i].content;

              if(page < notesContent.length){
                for (let j = page; j < page + pageSize; j++)
                {
                  if(notesContent[j])
                  this.notes.push(notesContent[j]);
                }

              }else{
                this.hasMore = false;
                this.isLoading = false;
                return;
              }
            }
        } 
        this.isLoading = false;
        this.page = page + pageSize;
      }
    },
     created() {
      this.switchTab(0);
      this.isLoading = false
    },
     onReachBottom() {
        if (this.isLoading) {
            // 防止数据还没回来再次触发加载
            return;
        }
        this.getList(this.page,2,this.currentIndex);
    }
}
</script>

<style>
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
  .Loading{
    width: 100%;
    font-size: 30rpx;
    color: #3e3e3e;
    text-align: center;
    margin-top: 20px;
  }
</style>
