import Validate from './components/validate'
import Request from './components/request'
import BeuatyRequest from './components/beauty-request'
import {host} from './../host/index'

const prePage=Page;
const preComponent=Component;
const REQUESTCONFIG = {
  baseURL:host
};

Page=function(option){
  option.validate = new Validate(REQUESTCONFIG);
  
  // 双向绑定扩展
  option.assignValue=function(e){
    console.log(e);
    let name=e.target.dataset.name;
    if(name) this.setData({
      [name]:e.detail.value
    });
  };
  // http请求
  option.beautyRequest=new BeuatyRequest();
  option.beautyRequest.init(REQUESTCONFIG);
  return prePage(option);
}
Component = function (option) {
  option.validate = new Validate();
  return preComponent(option);
}