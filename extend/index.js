import Validate from './components/validate'
import Request from './components/request'
import BeuatyRequest from './components/beauty-request'
import {host,psip} from './../host/index'

const prePage=Page;
const preComponent=Component;
const REQUESTCONFIG = {
  baseUrl:host
};
const PSIPCONFIG = {
  baseUrl: psip
};
const OPTION={
  validate: new Validate(),
  assignValue:function (e) {
    let name = e.target.dataset.name;
    if (name) this.setData({
      [name]: e.detail.value
    });
  }
};
wx.beautyRequest = new BeuatyRequest();
wx.psip=new BeuatyRequest();
wx.beautyRequest.init(REQUESTCONFIG);
wx.psip.init(PSIPCONFIG);

Page=function(option){
  return prePage(Object.assign(option,OPTION));
}