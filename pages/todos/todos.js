const AV = require('../../utils/av-live-query-weapp-min');
const Todo = require('../../model/todo');
const bind = require('../../utils/live-query-binding');

Page({
  data: {
    todos: [],
    inputVal: '',
    keyTitle: '',
    a: [],
    msgData: [
      { msg: '88888888888' }
    ]
  },

  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //获取用户输入的关键字
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

   // for (var n = 0; n < b.length; n++) {
    //  console.log("+++++++++++++++++++" + b[n].title)
   // }

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
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  //获取用户输入的密码
  BtnClick: function (e) {
    console.log("用户名：" + this.data.userName);
    // userNameInput()
  },
  //+++++++++++++++++++++++++++++++++++++++++++++
  button: function (e) {
    var trans = e.currentTarget.dataset.trans
    wx.navigateTo({
      url: '/pages/search/search?skip=' + JSON.stringify(trans)
    })
    for (var n = 0; n < trans.length; n++) {
      //console.log("第一个界面的值" + trans[n].title)
    }
  },


//-----张家豪的爱心--------------------
  
  setlove: function (e) {
    var objectId = e.currentTarget.dataset.id;
    var flag = e.currentTarget.dataset.flag;

    flag = !flag;
   // console.log(flag);
    const user = AV.User.current()
   // console.log(user.id)
   // console.log(e.currentTarget.dataset.index);
    var todo = AV.Object.createWithoutData('Todo', objectId);
    todo.set('flag', flag);
    todo.save().then(function (todo) {
     // console.log("ok!")
    });
   // console.log("表示:" + objectId + "flag:" + flag)

    this.setData({
      f: flag
    });

    this.onLoad()
    this.onShow()
  },



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
   // console.log(todos.length)
    return todos;
  },
  
  showTodo: function({ target: { dataset: { id } } }) {
   // console.log('show todo');
  },


//--------------评论-------------------------
// 删除留言

del(e) {
  var that = this
  var n = e.target.dataset.index;
   var list = that.data.msgData;
   
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



