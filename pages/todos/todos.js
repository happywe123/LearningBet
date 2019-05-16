const AV = require('../../utils/av-live-query-weapp-min');
const Todo = require('../../model/todo');
const bind = require('../../utils/live-query-binding');

Page({
  data: {
    todos: [],
      inputVal: '',

    msgData: [

      { msg: '88888888888' }

    ]

  },

  button: function () {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

//-----a张家豪的爱心
  onLoad: function (option) {
    // 获取接收到的id值
    var getId = option.id;
    // 让接收到的id值传递到data:{}里面
    this.setData({
      currentId: getId
    });
    // 读取所有的文章列表点赞缓存状态
    var cache = wx.getStorageSync('cache_key');
    // 如果缓存状态存在
    if (cache) {
      // 拿到所有缓存状态中的1个
      var currentCache = cache[getId];
      // 把拿到的缓存状态中的1个赋值给data中的collection，如果当前文章没有缓存状态，currentCache 的值就是 false，如果当前文章的缓存存在，那么 currentCache 就是有值的，有值的说明 currentCache 的值是 true
      this.setData({
        collection: currentCache
      })
    } else {
      // 如果所有的缓存状态都不存在 就让不存在的缓存存在
      var cache = {};
      // 既然所有的缓存都不存在，那么当前这个文章点赞的缓存也不存在，我们可以把当前这个文章点赞的缓存值设置为 false
      cache[getId] = false;
      // 把设置的当前文章点赞放在整体的缓存中
      wx.setStorageSync('cache_key', cache);
    }
  },

  toCollect: function (event) {
    // 获取所有的缓存
    var cache = wx.getStorageSync('cache_key');
    // 获取当前文章是否被点赞的缓存
    var currentCache = cache[this.data.currentId];
    // 取反，点赞的变成未点赞 未点赞的变成点赞
    currentCache = !currentCache;
    // 更新cache中的对应的1个的缓存值，使其等于当前取反的缓存值
    cache[this.data.currentId] = currentCache;
    // 重新设置缓存
    wx.setStorageSync('cache_key', cache);
    // 更新数据绑定,从而切换图片
    this.setData({
      // collection 默认的是 false
      collection: currentCache
    });
    // 交互反馈
    wx.showToast({
      title: currentCache ? '取消' : '点赞',
      icon: 'success',
      duration: 2000
    });
  },

//--------------------张家豪的爱心-----------------------------------------

  login: function() {
    return AV.Promise.resolve(AV.User.current())
      .then(
        user =>
          user
            ? user.isAuthenticated().then(authed => (authed ? user : null))
            : null
      )
      .then(user => (user ? user : AV.User.loginWithWeapp()));
  },

  fetchTodos: function (user) {

    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // 找出包含 「bug」 的 Todo
    // var query = new AV.Query(Todo);
    // query.startsWith('ACL', '早餐');
    // var query = new AV.Query('Todo');
    // query.includeACL(true);
    // query.find().then(function (todos) {
    //    console.log(user.ACL)
    // }).catch(function (error) {

    // })
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    const query = new AV.Query(Todo)
      // .equalTo('user', AV.Object.createWithoutData('User', user.id))
      .descending('createdAt');
    const setTodos = this.setTodos.bind(this);
    // console.log("当前用户Id:" + user.id)

    return AV.Promise.all([
      query.find().then(setTodos),
      query.subscribe()
    ]).then(([todos, subscription]) => {
      this.subscription = subscription;
      if (this.unbind) this.unbind();
      this.unbind = bind(subscription, todos, setTodos);
    });
  },


  onReady: function() {
  },

  onShow: function () {
    this.login()
    .then(this.fetchTodos.bind(this))
    .catch(error => consolo.error(error.message));    
  },

  onUnload: function() {
    this.subscription.unsubscribe();
    this.unbind();
  },

  onPullDownRefresh: function() {
    const user = AV.User.current();
    if (!user) return wx.stopPullDownRefresh();
    this.fetchTodos(user)
    wx.stopPullDownRefresh()
  },

  setTodos: function(todos) {
    this.setData({
      todos
    });
    console.log(todos.length)
    return todos;
  },
  
  showTodo: function({ target: { dataset: { id } } }) {
    console.log('show todo');
  },


//--------------评论-------------------------

  // 删除留言

  del(e) {

    var that = this

    var n = e.target.dataset.index;

    var list = that.data.msgData

    wx.showModal({

      title: '提示',

      content: '是否删除该条数据',

      success: function (res) {

        console.log(res.confirm)

        if (res.confirm) {

          list.splice(n, 1);

          that.setData({

            msgData: list

          })

          wx.showToast({

            title: '删除成功',

          })

        }



      }

    })



  },

  // 添加留言

  add(e) {

    if (this.data.inputVal == '') {

      wx.showToast({

        title: '请留言',

      })

      return false;

    }

    var list = this.data.msgData;

    var a = list ? list : []

    a.push({

      msg: this.data.inputVal

    })

    wx.setStorage({

      key: 'info',

      data: a,

    })

    this.setData({

      msgData: a,

      inputVal: ''

    })

  },

  changeinputVal(e) {

    this.setData({

      inputVal: e.detail.value

    })

  },

  onLoad: function () {

    var that = this;

    wx.getStorage({

      key: 'info',

      success: function (res) {

        //msgData还是空的

        var list = that.data.msgData;

        var a = list ? list : []

        var apple = res.data

        //将数据加入到msgData

        a = apple

        that.setData({

          msgData: a

        })

      }

    })

  },



});



