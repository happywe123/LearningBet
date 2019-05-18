const AV = require('../../utils/av-live-query-weapp-min');
const Todo = require('../../model/todo');
const bind = require('../../utils/live-query-binding');
const app = getApp()

Page({
  data: {
    inputVal: '',
    flag:null,
    title:'',
    objectid:'',
    content:'',
    updatedAt:'',
    tempFilePaths:'',
    msgData: [

      { msg: '88888888888' }

    ]


  },





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

  join: function (e) {
    var transgrouptitle = e.currentTarget.dataset.grouptitle
   
    console.log("测试界面船只:" + transgrouptitle)
    wx.navigateTo({
      url: '/pages/chatroom/chatroom?skiptitle=' + transgrouptitle,
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



  onLoad: function (options) {

    var transcontentall = JSON.parse(options.skipcontentall)

    // console.log("接收界面传过来的值：接收界面传过来的值：")
    // for (var i = 0; i < transcontentall.length;i++){
    //   console.log(transcontentall[i])
    // }
    this.setData({
      objectid: transcontentall[0],
      title: transcontentall[1],
      content: transcontentall[2],
      flag: transcontentall[3],
      updatedAt: transcontentall[4],
      tempFilePaths: transcontentall[5]

    })
    
  //  var ti='';
  //  var c='';
  //  var uptime='';
  //   //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //   var tt = options.ID;
  //   // console.log("界面传质:"+jj)
  //   var query = new AV.Query('Todo');
  //   query.get(tt).then(function (todo) {
  //     // 成功获得实例
  //     // todo 就是 id 为 558e20cbe4b060308e3eb36c 的 Books 对象实例
  //      ti = todo.get('title');
  //      c = todo.get('content');
  //      uptime = todo.get('updatedAt');
  //      f=todo.get('flag');
  //      getApp().globalData.tag=f;
  //     getApp().globalData.id=tt;
  //     console.log(ti);
  //     console.log('----------------'+f);
  //     console.log('----------------' + getApp().globalData.id);  

  //   }, function (error) {
  //     // 异常处理
  //     console.error(error);
  //   });

  //   console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv"+ti)
  //   this.setData({
  //     id: tt,
  //   })
  //   this.setData({
  //     title: ti,
  //     content: "bbbbbb",
  //     updatedAt: uptime,
  //     flag: f
  //   })

    


    






  //   //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //   var that = this;
  //   wx.getStorage({
  //     key: 'info',
  //     success: function (res) {

  //       //msgData还是空的
  //       var list = that.data.msgData;
  //       var a = list ? list : []
  //       var apple = res.data
  //       //将数据加入到msgData
  //       a = apple
  //       that.setData({
  //       msgData: a
  //       })
  //     }
  //   })
  },





  button: function () {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  //-----a张家豪的爱心
  setlove: function (e) {
    var f = this.data.flag;
    var id = this.data.objectid;
     console.log(id+f+'1111111111111111')
     f=!f;
     this.setData({
       flag:f
     })
     console.log(f+"++++++++++++++"+id);
     const user = AV.User.current();
    // // 
    // // console.log(e.currentTarget.dataset.index);
    var todo = AV.Object.createWithoutData('Todo', id);
    todo.set('flag', f);
    todo.save().then(function (todo) {
      console.log("ok!");
    });
    // console.log("表示:" + id + "flag:" + flag)
    // this.setData({
    //   f: flag
    // });
    // this.onLoad()
    // this.onShow()
  },

  //--------------------张家豪的爱心-----------------------------------------

  login: function () {
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


  onReady: function () {
  },

  onShow: function () {
    this.login()
      .then(this.fetchTodos.bind(this))
      .catch(error => consolo.error(error.message));
  },

  onUnload: function () {
    this.subscription.unsubscribe();
    this.unbind();
  },

  onPullDownRefresh: function () {
    const user = AV.User.current();
    if (!user) return wx.stopPullDownRefresh();
    this.fetchTodos(user)
    wx.stopPullDownRefresh()
  },

  setTodos: function (todos) {
    this.setData({
      todos
    });
    console.log(todos.length)
    return todos;
  },

  // showTodo: function ({ target: { dataset: { id } } }) {
  //   console.log('show todo');
  // },
  showTodo: function (){

  },





});




