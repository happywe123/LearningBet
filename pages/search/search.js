// pages/search/search.js
var WxSearch = require('../../wxSearch/wxSearch.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    todos: [],
    keyTitle: '',
    a: [],
    selectKey: ''
  },
  keyInput: function (e) {
    // console.log("用户名：" + e.detail.value)
    this.setData({
      userName: e.detail.value
    })
    //将匹配到的选项放到b中
    var b = []
    var count = 0
    var flag = 0
    var trans = e.currentTarget.dataset.trans
    for (var j = 0; j < e.detail.value.length; j++) {
      for (var i = 0; i < trans.length; i++) {
        console.log(trans[0].title.substring(0, 1))
        if (e.detail.value == trans[i].title.substring(0, j + 1)) {
          b[count] = trans[i]
          count++
        }
      }
    }

    for (var n = 0; n < b.length; n++) {
      console.log("+++++++++++++++++++" + b[n].title)
    }
    this.setData({
      a: b
    });

    // console.log("akakakakakkkakak"+a.title)
  },

  //搜索按钮
  wxSearchFn: function (e) {
    var k = this.data.userName
    //将匹配到的选项放到b中
    var b = []
    var count = 0
    var flag = 0
    var trans = e.currentTarget.dataset.trans
    for (var j = 0; j < k.length; j++) {
      for (var i = 0; i < trans.length; i++) {
        console.log(trans[0].title.substring(0, 1))
        if (k == trans[i].title.substring(0, j + 1)) {
          b[count] = trans[i]
          count++
        }
      }
    }
    this.setData({
      a: b
    });

    console.log("before")
    var that = this
    WxSearch.wxSearchAddHisKey(that);
    console.log("after")

  },
  wxSearchInput: function (e) {
    var that = this
    WxSearch.wxSearchInput(e, that);
  },
  wxSerchFocus: function (e) {
    var that = this
    WxSearch.wxSearchFocus(e, that);
  },
  wxSearchBlur: function (e) {
    var that = this
    WxSearch.wxSearchBlur(e, that);
  },

  //从弹出框中选关键字
  wxSearchKeyTap: function (e) {
    var select = e.currentTarget.dataset.transto
    this.setData({
      userName: select
    });
    console.log(select)
    var that = this
    WxSearch.wxSearchKeyTap(e, that);
  },
  wxSearchDeleteKey: function (e) {
    var that = this
    WxSearch.wxSearchDeleteKey(e, that);
  },
  wxSearchDeleteAll: function (e) {
    var that = this;
    WxSearch.wxSearchDeleteAll(that);
  },
  wxSearchTap: function (e) {
    var that = this
    WxSearch.wxSearchHiddenPancel(that);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad')
    var that = this
    //初始化的时候渲染wxSearchdata
    WxSearch.init(that, 43, ['z', '英语', '健身', '读书', '打卡', '编程']);
    WxSearch.initMindKeys(['weappdev.com', '微信小程序开发', '微信开发', '微信小程序']);

    var haha = JSON.parse(options.skip)
    this.setData({
      todos: haha
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})





