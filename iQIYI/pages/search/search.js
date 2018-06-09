import util from '../../utils/util.js';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        searchVal: "",
        result: [],
        hiddenList: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },
    bindKeyInput: function(e) {
        this.setData({
            searchVal: e.detail.value
        })
        this.search();
    },
    clear: function() {
        this.setData({
            searchVal: '',
            result: []

        })
    },
    cancel: function() {
        wx.navigateBack({
            delta: 1
        })
    },
    search: function() {
        util.request({
                url: `https://www.easy-mock.com/mock/5b0c37bed0e51c310ce24ab0/iqiyi/media#!method=get`,
                mock: false,
                data: {
                    key: this.data.searchVal
                }
            })
            .then(res => {
                this.setData({
                    result: res
                })
                console.log(this.data.result)
            })
    },
    resultPage: function() {
        this.search();
        wx.navigateTo({
            url: `search-result/search-result`
        })
    },
    clickResult: function(e) {
        let index = e.currentTarget.dataset.num;
        let StorageResult = [];
        const result = this.data.result;
        for (let i = 0; i < result.length; i++) {
            if (i == index) {
                StorageResult = result.splice(i, 1);
            }
        }
        StorageResult.push(result)
        wx.getStorage({
            key: 'String',
            success: function(res) {
                // success
            },
            fail: function() {
                // fail
            },
            complete: function() {
                // complete
            }
        })
        wx.navigateTo({
            url: `search-result/search-result`
        })

    }

})