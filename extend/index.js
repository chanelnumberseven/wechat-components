import Validate from './validate'
const prePage=Page;
const preComponent=Component;

Page=function(option){
  option.validate=new Validate();
  // 双向绑定扩展
  option.assignValue=function(e){
    console.log(e);
    let name=e.target.dataset.name;
    if(name) this.setData({
      [name]:e.detail.value
    });
  };
  return prePage(option);
}
Component = function (option) {
  option.validate = new Validate();
  return preComponent(option);
}