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
                <notes-content :notes="notes" @checkDetail="checkDetail"></notes-content>
              </scroll-view>
          </swiper-item>
        </swiper>
    </div>
</template>

<script>
import search from '@/components/Search'
import selectTab from '@/components/SelectTab'
import content from '@/components/Content'
import axios from 'axios'

export default {
  components: {
        search,
        selectTab,
        'notesContent':content   
     },
    data(){
        return{
            tabBar:[
              {tabName:'推荐',isSelected:true,
              content:[
                  {
                    "id":'0001',
                    "notePic": "/static/images/search.png",
                    "title": "又是一年毕业季",
                    "userPic": "/static/images/my.png",
                    "userName": "啦啦啦",
                  },
                  {
                    "id":'0002',
                    "notePic": "/static/images/search.png",
                    "title": "又是一年毕业季2",
                    "userPic": "/static/images/my.png",
                    "userName": "哈哈哈"
                  }
                ]
              },
              {tabName:'视频',isSelected:false,
              content:[
                  {
                    "id":'0003',
                    "notePic": "https://ci.xiaohongshu.com/8533df7b-13c8-402e-b9af-454080293465@r_640w_640h.jpg",
                    "title": "🧢Produce48｜剧本太明显，心疼中国妹子王怡人、王💃🏻💃🏻💃🏻💃🏻💃🏻💃🏻💃🏻💃🏻💃🏻💃🏻",
                    "userPic": "/static/images/my.png",
                    "userName": "啦啦啦"
                  },
                  {
                    "id":'0004',
                    "notePic": "https://ci.xiaohongshu.com/8ea674e4-12e9-4240-841a-82705a0a5263@r_640w_640h.jpg",
                    "title": "在东京的姐妹穿搭👭",
                    "userPic": "/static/images/my.png",
                    "userName": "哈哈哈"
                  }
                ]
              },
              {tabName:'世界杯',isSelected:false},
              {tabName:'护肤',isSelected:false},
              {tabName:'彩妆',isSelected:false},
              {tabName:'美食',isSelected:false},
              {tabName:'旅行',isSelected:false},
              {tabName:'影视',isSelected:false},
              {tabName:'读书',isSelected:false},
              {tabName:'明星',isSelected:false},
              {tabName:'家居',isSelected:false},
              {tabName:'音乐',isSelected:false},
              {tabName:'宠物',isSelected:false},
              {tabName:'婚礼',isSelected:false},
              {tabName:'母婴',isSelected:false},
              {tabName:'萌娃',isSelected:false},
              {tabName:'数码',isSelected:false},
              {tabName:'男士穿搭',isSelected:false}],
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
      },
      checkDetail(e){
        console.log(e);
      }
    },
    created() {
        this.switchTab(0);
        // axios.get('https://www.easy-mock.com/mock/5b38f1f28b3b752220ff649a/xiaohongshu/tabSwitch#!method=get')
        //     .then((res) => {
        //         // this.noteReadableStreamle;
        //         console.log(res)
        //     })
        //     .catch(function(error) {
        //         console.log(error);
        //     });
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
