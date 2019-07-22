import extend from './extend/index'
//app.js
App({
  onLaunch: function () {

  },
  onPageNotFound:function(){
    wx.navigateTo({
      url: '/pages/404/404'
    })
  },
  globalData: {
    userInfo: null
  }
})