const AV = require('../../utils/av-live-query-weapp-min');
const Todo = require('../../model/todo');
const bind = require('../../utils/live-query-binding');

Page({
  data: {
    todos: []
  },

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
    const query = new AV.Query(Todo)
      .equalTo('user', AV.Object.createWithoutData('User', user.id))
      .descending('createdAt');
    const setTodos = this.setTodos.bind(this);
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
    if (getCurrentPages().length == 3) {
      wx.navigateBack({
        delta: 1
      })
    }
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
    return todos;
  },

  showTodo: function ({ target: { dataset: { id } } }) {
    console.log('show todo');
  },
  
  //打卡记录删除
  deleteInfo: function (event) {
    console.log(event.currentTarget.dataset.total)
    var objectid = event.currentTarget.dataset.total;
    const user = AV.User.current()
    console.log(event.currentTarget.dataset.index);
    var todo = AV.Object.createWithoutData('Todo', objectid);
    todo.destroy().then(function (success) {
      // 删除成功
    }, function (error) {
      // 删除失败
    });
  },

});
