import {host} from './../../host/index'
module.exports={
  autoLogin:function(){
    let userInfo = wx.getStorageSync('userInfo');
    if(!userInfo) return;
    userInfo = JSON.parse(userInfo);
    if(!userInfo.createTime) return;
    if (new Date() - new Date(userInfo.createTime)>59*60*1000) return;
    this.toHome(userInfo,true);
  },
  toHome: function (data,update) {
    if(!update){
      data.createTime = new Date().toISOString();
      wx.setStorageSync('userInfo', JSON.stringify(data));
    }
    this.userInfo = {
      merchantLogo: data.MerchantLogo,
      merchantName: data.MerchantName,
      ownerId: data.OwnerId,
      phone: data.Phone,
      projectCode: data.ProjectCode,
      realName: data.RealName,
      token: data.Token,
      weChatOpenid: data.WeChatOpenid
    };
    wx.beautyRequest.init({
      baseUrl: host,
      header: {
        token: data.Token
      }
    });
    wx.reLaunch({
      url: '/pages/home/home'
    })
  },
  signOut:function() {
    wx.clearStorageSync();
    return wx.reLaunch({
      url: '/pages/start/login/login'
    })
  }
}