import extend from './extend/index'
import util from './utils/index'
import update from './extend/app/update'
import autoLogin from './extend/app/auto-login'
//app.js
App({
  onLaunch: function () {
   this.update();
   this.autoLogin();
  },
  onPageNotFound:function(){
    wx.navigateTo({
      url: '/pages/404/404'
    })
  },
  util: util,
  ...update,
  ...autoLogin,
  appId: "wx5d6d6c53c868fa60",
  userInfo:{},
})