import Request from './request'
const config = {
  getCode: function(data) {
    return data.code
  },
  getMessage: function(data) {
    return data.msg
  },
  successCode: [200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 301, 302, 303, 304, 305, 306, 307, 308, 309, 10000]
};
function setPageState(page,code,message){
  if(!page) return;
  if(code===-1){
    page.setData({
      loading:true
    })
  }else{
    page.setData({
      loading: false
    })
  }
  page.setData({
    code:code,
    message:message
  })
}
function BeautyRequest(_config = {},requestOption){
  Object.assign(this, config, _config);
  this.requestOption=requestOption;
}

BeautyRequest.prototype.getType = function(data) {
  let type = Object.prototype.toString;
  BeautyRequest.prototype.getType = function(data) {
    return type.call(data).split(' ')[1].replace(']', '').toLowerCase();
  }
  return type.call(data).split(' ')[1].replace(']', '').toLowerCase();
};

BeautyRequest.prototype.handleResponse = function(res, obj, page, resolve, reject) {
  let data = res.data;
  let msg = this.getMessage(data);
  let code = this.getCode(data);
  if (successCode.indexOf(code) !== -1){
    this.requestSuccess(data, obj, resolve);
  }else{
    this.requestFail(msg, obj, reject);
  }
  setPageState(page, code, msg);
}
BeautyRequest.prototype.requestSuccess = function(data, obj, resolve) {
  if (obj.success) obj.success(data);
  if (obj.successTip) wx.showToast({
    icon: 'none',
    title: obj.successTip
  });
  resolve(data);
};
BeautyRequest.prototype.requestFail = function(error,obj,reject) {
  if (obj.fail) obj.fail(error);
  if (obj.failTip) wx.showToast({
    icon: 'none',
    title: `${obj.noErrorDetail ? obj.failTip : obj.failTip + error}`
  });
  reject(error);
};
BeautyRequest.prototype.beautyRequest=function(obj,page,method){
  let successCode = this.successCode;
  let url = obj.url;
  let that = this;
  setPageState(page,-1,'');
  return new Promise((resolve, reject) => {
    this.request[method]({
      url: obj.url,
      success: function (res) {
        that.handleResponse(res, obj, page, resolve, reject);
      },
      fail: function (error) {
        that.requestFail(error, obj, reject);
      },
      complete: function () {
        if (obj.complete) obj.complete();
      }
    })
  });
};
['Get','Put','Post','Delete'].forEach(function(item){
  BeautyRequest.prototype[`beauty${item}`] = function (obj, page) {
    this.beautyRequest(obj, page,item.toLowerCase());
  };
});

BeautyRequest.prototype.beautyAll = function (obj,page){
  setPageState(page,-1,'');
  return new Promise(function (resolve, reject){
    Promise.all(obj.params).then(function(datas){
      setPageState(page,10000,'');
      if (obj.success) obj.success(datas);
      resolve(datas);
    }).catch(function (error) {
      setPageState(page,'error', error);
      if (obj.fail) obj.fail(error);
      reject(error);
      }).finally(function () {
        if(obj.complete) obj.complete();
      });
  })
};
// 请求构造函数的初始化
BeautyRequest.prototype.init = function(option){
  this.request = new Request(option||this.requestOption);
}
export default BeautyRequest