// pages/search/search.js
var WxSearch = require('../../wxSearch/wxSearch.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    todos: [],
    keyTitle: '',
    a: []
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

    // for (var n=0;n<b.length-1;n++){
    //   for (var j = 0; j < b.length ; j++)
    //   if(b[n].title == b[j].title){
    //     b.splice(j,1)
    //   }
    // }  
    this.setData({
      a: b
    });

    // console.log("akakakakakkkakak"+a.title)
  },
  // setTodos: function () {
  //   var query = new AV.Query('Todo');
  //   query.get('5cdc08e543e78c006877db5d').then(function (todo) {
  //     // 成功获得实例
  //     // todo 就是 id 为 558e20cbe4b060308e3eb36c 的 Books 对象实例
  //     var title = todo.get('title');
  //     var content = todo.get('content');
  //     console.log(title);
  //     console.log(content);
  //   }, function (error) {
  //     // 异常处理
  //     console.error(error);
  //   });
  //   return todos;
  // },

  wxSearchFn: function (e) {
    var that = this
    WxSearch.wxSearchAddHisKey(that);
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
  wxSearchKeyTap: function (e) {
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
    // console.log("lllllllllllllllllllllllllllllllllllllllll" + that.value)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad')
    var that = this
    //初始化的时候渲染wxSearchdata
    WxSearch.init(that, 43, ['跑步', '英语', '健身', '读书', '打卡', '编程']);
    WxSearch.initMindKeys(['weappdev.com', '微信小程序开发', '微信开发', '微信小程序']);


    // this.data.todos = JSON.parse(options.skip)
    var haha = JSON.parse(options.skip)
    this.setData({
      todos: haha
    })

    // var kk = []
    // kk = options.skip
    // for (var i = 0; i < todos.length; i++) {
    //   console.log("测试夸界面传值" + todos[i].title + "    " + todos[i].content)
    // }

    for (var i = 0; i < haha.length; i++) {
      console.log("测试夸界面传值" + haha[i].title)
    }
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