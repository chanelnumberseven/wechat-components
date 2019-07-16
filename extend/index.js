import Validate from './validate'
const prePage=Page;
const preComponent=Component;

Page=function(option){
  option.validate=new Validate();
  return prePage(option);
}
Component = function (option) {
  option.validate = new Validate();
  return preComponent(option);
}