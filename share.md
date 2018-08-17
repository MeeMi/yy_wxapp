## 前言
在炎热的夏天我觉得最舒服的就是宅在家里，吹着空调，吃着零食看电视剧电影里的帅气小哥哥、漂亮小姐姐了，超级美滋滋！在闲暇时光我经常用爱奇艺小程序看下视频，加上现在学习了一段时间小程序了，“啪”，动手模仿一个爱奇艺视频小程序的念头产生了。虽然现在还是个小白，但是希望在这趟“爱奇艺小程序之旅”上为各位乘客朋友好好开车（划掉，好好介绍我的问题与经验hhh

## 前期准备
- 微信开发者工具
- [小程序开发文档](https://www.w3cschool.cn/weixinapp/9wou1q8j.html)
- [easy-mock](https://www.easy-mock.com/project/5b0c37bed0e51c310ce24ab0)：是一个前端接口模拟神器！此处放的是我的数据接口
- 项目图片资源：如果想要get一下源码和图片，可以借鉴一下这篇文章哦 [两步快速获取微信小程序源码](https://juejin.im/post/5b0e431f51882515497d979f) 

滴滴 开始发车啦

## 项目功能
- 首页界面
- 任意点击视频缩略图即可跳转到相关页面
- 热点tab的下拉，上滑加载的基础功能
- 搜索匹配电影名

这是总的效果

![爱奇艺小程序](https://github.com/yuanyuneee/yy_wxapp/blob/master/iQIYI/demo_images/iqiyi%E6%80%BB%E6%95%88%E6%9E%9C.gif?raw=true)

## 详细介绍

### 1.首页的轮播图

这里使用的是小程序的滑块视图容器`swiper`组件，用来做轮播图那叫一个简单方便

使用过爱奇艺小程序的朋友会发现首页简单介绍视频信息的轮播图是布局在页面中间并且每一张图片都不相连的，滑动时很是简洁大方。一开始我是简单的使用，将`swiper`设置了宽高并使之居中，就产生了下面的结果：只有中间的内容在滑动，并不是想要的效果

![失败滴轮播图](https://github.com/yuanyuneee/yy_wxapp/blob/1b7b4a66fe9a7cd36425cafe165f40589393ee82/iQIYI/demo_images/%E5%A4%B1%E8%B4%A5%E8%BD%AE%E6%92%AD%E5%9B%BE.gif?raw=true)

那看来即使`swiper`组件看起来简单也要好好研究一番哪,看了文档之后我发现`swiper`组件其实是`swiper-item`在滑动，并且它仅可放置在`swiper`组件中，宽高自动设置为100%。既然这样，那就去设置`swiper-item`的宽度好了

    swiper{
        width:100%;
    }
    swiper-item{
        width:80%;
    }

结果就成了这个样子:


emmm好像不太行，似乎每一个`swiper-item`总是那么分不开啊，那就去设置里面的内容的样式吧

    .info-box{
        width: 100%;
        margin: 0 60rpx;
    }

总算这样才做到了想要的效果。撒花~

### 2.宣传图跟着轮播图改变

在这里是使用了`swiper`的`bindchange`方法。只要滑动了就会触发，并且有一个current代表当时滑动到第几个。这样想来，`swiper`好像一个数组，里面包含着很多的`swiper-item`

所以我们可以在js部分通过获取到这个current值，在对应的图片资源数组中遍历并取出地址，换成宣传图的地址即可

    //index.js
            moviepicChange(e) {
            const imgsUrlList = this.data.imgsUrlList; //图片资源
            let bigImg = this.data.bigImg;
            let video_id = this.data.video_id;

            for (let i = 0; i < imgsUrlList.length; i++) {
                if (i == e.detail.current) { //如果current值与图片数组索引值匹配到了，则
                    bigImg = imgsUrlList[i].thumbnail; //换掉宣传图片地址
                    video_id = imgsUrlList[i].video_id;
                }
            }
            this.setData({
                bigImg: bigImg,
                video_id
            })
        }

### 3.任意点击视频缩略图即可跳转到相关页面

效果是这样子滴

![视频详情](https://github.com/yuanyuneee/yy_wxapp/blob/1b7b4a66fe9a7cd36425cafe165f40589393ee82/iQIYI/demo_images/%E8%A7%86%E9%A2%91%E8%AF%A6%E6%83%85.gif?raw=true)

在这个功能里头，数据处理是我碰到的一大难题了，因为没有后端，我就想试图模拟一下点击一个图片就发送视频id,并由后端返回响应数据的操作，大致思路就是就是通过了一个“中间站”去处理。emmm 可能有一点笨笨的= =。

1. 首先准备好来自Easy-Mock的数据接口
2. 然后对视频缩略图上绑定一下事件，用data-传递想要用于查询的参数

    <swiper-item data-vid="{{item.video_id}}" data-title="{{item.title}}" bindtap="openDetail"></swiper-item>

3. 视频详情页面获取到传过来的id之后就可以发起请求，因为wx.request是个异步操作，需要一点时间，此处我对wx.request进行了封装，返回一个promise的办法就可以把异步操作变成了同步的啦ヾ(◍°∇°◍)ﾉﾞ

    //video-detail.js
    requestVideo: function(num = 0) {
        util.request({ //封装的util.request方法
                url: `https://www.easy-mock.com/mock/5b0c37bed0e51c310ce24ab0/iqiyi/media#!method=get`,  //请求地址
                data: { // 请求参数
                    id: this.data.video_id,
                    tag: 'dramas',
                    langs: 'en'
                }
            })
            .then(res => { //res是返回的数据
                //对数据进行处理，之后便可通过数据绑定在页面显示响应内容
            })
    }
    
创建一个util工具文件夹，用于提供工具方法。这里就是我模拟后端传回响应数据的地方，先在util.js内获取所有的数据，再根据视频详情页面发送过来的参数对已经获得的数据进行处理，通过返回`promise`，`.then`的操作在视频详情页面获得由util.js处理之后的数据。

    //util.js    
    let util = {
    request(opt) {
        let options = Object.assign({},opt); //花括号是目标对象，后面的opt是源对象。进行对象合并：将源对象里面的属性添加到目标对象中去，若两者的属性名有冲突，后面的将会覆盖前面的
        let { url, data} = options; //结构成这两个变量

        return new Promise((resolve, reject) => { //向请求发起页面返回一个promise
            wx.request({ //发送请求
                url,
                data,
                success(res) { //请求到数据之后对数据进行处理
                    let returnRes = [];
                    if (data.hasOwnProperty('tag')) { 
                        let arr = res.data[data.tag];

                        if (data.hasOwnProperty('id')) { //如果请求参数中有tag，id则进行以下匹配
                            console.log(arr)
                            for (let i in arr) {
                                if (arr[i].video_id === data.id) { 
                                    returnRes = arr[i]; //得到跟点击的缩略图相对应的视频资源
                                }
                            }
                            resolve(returnRes)
                            return;
                        }
                        returnRes = arr;
                    }
                    resolve(returnRes)
                },
                fail(err) {
                    reject(err)
                }
            })
        })
    }
    }


### 4.关键字搜索

![搜索](https://github.com/yuanyuneee/yy_wxapp/blob/1b7b4a66fe9a7cd36425cafe165f40589393ee82/iQIYI/demo_images/%E6%90%9C%E7%B4%A2.gif?raw=true)

1. 首先是在搜索页面获取到关键字，之后作为请求参数使用上述封装好`util.request`进行请求与数据处理

2. 依然是在获取到所有数据之后，在众多数据中通过`RegExpObject.test(string)`实现关键字的遍历匹配

    //util.js
    if (data.hasOwnProperty('key')) { //如果请求参数是key
        const media = res.data;
        for (let i in media) { //遍历匹配电影名
            for (let j in media[i]) {
                var re = new RegExp(data.key);
                if (re.test(media[i][j].title)) {
                    returnRes.push(media[i][j]); //得到匹配好的电影
                }
            }
    }
        resolve(returnRes)
        return;
    }
    resolve(returnRes)


3. 使用`util.request`得到数据之后，搜索列表一项一项就可以显示出来。重点是(敲黑板),一般来说点击哪一项，在搜索结果页面那一项就会排在最上面，那我就想要不然再建一个由点击的的那一项作为第一项的查询结果数组，将它存在本地然后在下一个页面取出并显示！

    //search.js
    clickResult: function(e) {
        let index = e.currentTarget.dataset.num; //点击了第几项
        let searchVal = this.data.searchVal; //关键词
        let StorageResult = []; // 用于存在本地的数组

        let temp = [];
        const result = this.data.result;

        for (let i = 0; i < result.length; i++) {
            if (i == index) {
                temp = result.splice(i, 1); //取出点击的那一项
            }
        }
        StorageResult = temp;
        for (let i in result) {
            StorageResult = [...StorageResult, result[i]] //将点击的那一项作为数组首位，其他搜索结果再依次放入
        }
        wx.setStorage({ //在本地缓存搜索结果
            key: 'searchResult',
            data: StorageResult,
            success: function(res) {
                wx.navigateTo({
                    url: `search-result/search-result?key=${searchVal}` //跳转到下一个页面
                })
            }
        })
    }
    
    
4. 另外，搜索结果会顺带把集数罗列出来，那就需要实现点哪集就在视频详情页定位到哪集的功能

- 先在wxml里通过`data-`把id、集数、标题传到下一个页面，在onload里头获取集数

    //video-detail.js
    onLoad: function(option) {
        this.setData({
            video_id: option.id,
            mediaList: null,
        })
        wx.setNavigationBarTitle({ //设置导航条名称
            title: option.title
        })
        if (option.hasOwnProperty('num')) { //调用请求资源方法传入集数
            this.requestVideo(option.num);
        } else {
            this.requestVideo();
        }
    }

- 请求所有视频资源之后并遍历，把当前播放地址设为选中的那集

    requestVideo: function(num = 0) { //没有选择集数，则集数默认是0
        util.request({
               ...(略)
            })
            .then(res => {
                this.setData({
                        mediaList: res,
                        isLoading: false,
                        playerUrl: res.drama_num[num].video_url //修改播放地址
                    })
                this.pickNum(num); //改变集数选择状态
            })
    }

- 用于改变集数选择状态

    pickNum: function(num) {
        for (let i of mediaList.drama_num) {
            i.selected = parseInt(i.drama_id) === parseInt(num) + 1 //如果选择的集数与视频资源的id一样就改变该集的选中状态
            if (i.selected) {
                playerUrl = i.video_url
            }
        }
        this.setData({
                mediaList,
                playerUrl
            })
    }

## 结束语

学习的时间比较短，做的项目还有超多不完善的，也很多没有学习到的！但是要我认为要勇于分享 ，才能更好进步(๑´ㅂ`๑) ，希望能帮助一些人，又希望有人能多多指点我。

如果说万事开头难，现在我迈出了第一步，写了第一个小程序，第一篇分享文章，希望自己对技术能一直充满热情，多学习多钻研(握拳！

最后厚脸皮的说喜欢这篇文章的可以点个赞吗！比心！还有这里是 [我的源码地址](https://github.com/yuanyuneee/yy_wxapp/tree/master/iQIYI)

    

