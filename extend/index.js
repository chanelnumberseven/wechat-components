import Validate from './components/validate'
import Request from './components/request'
import BeuatyRequest from './components/beauty-request'
import {
  host,
  psip
} from './../host/index'
import {signOut} from './app/auto-login';
const prePage = Page;
const preComponent = Component;
const REQUESTCONFIG = {
  baseUrl: host,
  header: {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJPcGVuSWQiOiJvVThIWDVidVZjX19TdEtWYktfbmtyLWhXMFJJIiwiTWVyY2hhbnRJZCI6IjI0NCIsIk1lcmNoYW50TmFtZSI6IuWBnOi9puWIuOWVhuWutkEiLCJQcm9qZWN0Q29kZSI6IjExNTcwMSIsIk93bmVySWQiOiIxMTU3IiwiZXhwIjoxNTY1MjMxMzY1LCJpc3MiOiIqIiwiYXVkIjoiKiJ9.ekcnePpylTLLlUjC6SDqjd8SJevMOPE_aHheJFQwOeE'
  }
};
const CONFIG={
  on401:signOut
};
const PSIPCONFIG = {
  baseUrl: psip
};
const OPTION = {
  assignValue: function (e) {
    let name = e.target.dataset.name;
    if (name) this.setData({
      [name]: e.detail.value
    });
  }
};
wx.beautyRequest = new BeuatyRequest(CONFIG);
wx.psip = new BeuatyRequest(CONFIG);
wx.beautyRequest.init(REQUESTCONFIG);
wx.psip.init(PSIPCONFIG);

Page = function(option={}){
  option.validate=new Validate();
  return prePage(Object.assign(option, OPTION));
}