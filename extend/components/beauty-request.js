import Request from './request'
const HTTPSUCCESSSTATE = [200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 301, 302, 303, 304, 305, 306, 307, 308, 309];
const config = {
  getCode: function(data) {
    return data.Code||'未知错误'
  },
  getMessage: function(data) {
    return data.Message||'未知错误'
  },
  resTemplate: {
    Code: '未知错误',
    Data: null,
    Message: ''
  },
  successCode: [10000]
};

function setPageState(page,code,message){
  if(!page) return;
  if(code===-1){
    page.setData({
      loading:true,
      disabled:true
    })
  }else{
    page.setData({
      loading: false,
      disabled:false
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

BeautyRequest.prototype.handleResponse = function(data,obj, page, resolve, reject) {
  let msg = this.getMessage(data);
  let code = this.getCode(data);
  if (this.successCode.indexOf(code) !== -1){
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
BeautyRequest.prototype.beautyRequest=function(option,page,method){
  let that = this;
  setPageState(page,-1,'');
  return new Promise((resolve, reject) => {
    let agent = Object.assign({}, this.requestOption, option);
    agent.success = (res) => {
      let httpState = res.statusCode;
      if (HTTPSUCCESSSTATE.indexOf(httpState) === -1) {
        this.requestFail(httpState,option, reject);
        setPageState(page, httpState, httpState);
      } else {
        let data = Object.assign({}, this.resTemplate, res.data);
        this.handleResponse(data,option, page, resolve, reject);
      }
    };
    agent.fail = (error) => {
      this.requestFail(error,option,reject);
      setPageState(page, 'error', error.errMsg || error.toString());
    };
    this.request[method](agent);
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
  this.requestOption=option||this.requestOption;
  this.request = new Request(this.requestOption);
}
export default BeautyRequest