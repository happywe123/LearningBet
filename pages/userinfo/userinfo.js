const AV = require('../../utils/av-live-query-weapp-min');
const Pim = require('../../model/pim');
const bind = require('../../utils/live-query-binding');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    age: '',
    cha: '',
    hobby: ''
  },
  //授权登陆
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
  //获取当前用户
  fetchTags: function () {
    const user = AV.User.current();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.fetchTags.bind(this);
  },
  setPim: function (pims) {
    const activePims = pims.filter(pim => !pim.done);
    this.setData({
      todos,
      activePims
    });
    return pims;
  },
  updatext1: function ({ detail: { value } }) {
    // Android 真机上会诡异地触发多次时 value 为空的事件
    if (!value) return;
    this.setData({
      age: value
    });
  },
  updatext2: function ({ detail: { value } }) {
    // Android 真机上会诡异地触发多次时 value 为空的事件
    if (!value) return;
    this.setData({
      cha: value
    });
  },
  updatext3: function ({ detail: { value } }) {
    // Android 真机上会诡异地触发多次时 value 为空的事件
    if (!value) return;
    this.setData({
      hobby: value
    });
  },
  addPim: function () {
    var age = this.data.age && this.data.age.trim();
    var cha = this.data.cha && this.data.cha.trim();
    var hobby = this.data.hobby && this.data.hobby.trim();
    if (!age || !cha || !hobby) {
      return;
    }
    var acl = new AV.ACL();
    acl.setPublicReadAccess(false);
    acl.setPublicWriteAccess(false);
    acl.setReadAccess(AV.User.current(), true);
    acl.setWriteAccess(AV.User.current(), true);
    new Pim({
      age: age,
      cha: cha,
      hobby: hobby,
      done: false,
      user: AV.User.current()
    })
      .setACL(acl)
      .save()
      .then(pim => {
        wx.switchTab({
          url: '../user/user'
        })
      })
      .catch(console.error);
    this.setData({
      draft: ''
    });
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
    wx.stopPullDownRefresh();
  }
})
