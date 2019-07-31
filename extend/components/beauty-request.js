import Request from './request'
const HTTPSUCCESSSTATE = [200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 301, 302, 303, 304, 305, 306, 307, 308, 309];
const config = {
  getCode: function(data) {
    return data.Code || '未知错误'
  },
  getMessage: function(data) {
    return data.Message || '未知错误'
  },
  resTemplate: {
    Code: '未知错误',
    Data: null,
    Message: '服务器繁忙'
  },
  on401: function() {
    wx.clearStorageSync();
    return wx.reLaunch({
      url: '/pages/start/login/login'
    })
  },
  successCode: [10000]
};

function setPageState(page, code, message) {
  if (!page) return;
  if (code === -1) {
    page.setData({
      loading: true,
      disabled: true
    })
  } else {
    page.setData({
      loading: false,
      disabled: false
    })
  }
  page.setData({
    code: code,
    message: message
  })
}

function BeautyRequest(_config = {}, requestOption) {
  Object.assign(this, config, _config);
  this.requestOption = requestOption;
}

BeautyRequest.prototype.getType = function(data) {
  let type = Object.prototype.toString;
  BeautyRequest.prototype.getType = function(data) {
    return type.call(data).split(' ')[1].replace(']', '').toLowerCase();
  }
  return type.call(data).split(' ')[1].replace(']', '').toLowerCase();
};

BeautyRequest.prototype.handleResponse = function(data, obj, page) {
  let msg = this.getMessage(data);
  let code = this.getCode(data);
  if (this.successCode.indexOf(code) !== -1) {
    this.requestSuccess(data, obj);
  } else {
    this.requestFail(msg, obj);
  }
}
BeautyRequest.prototype.requestSuccess = function(data, obj) {
  if (obj.success) obj.success(data);
  if (obj.successTip) wx.showToast({
    icon: 'none',
    title: obj.successTip
  });
};
BeautyRequest.prototype.requestFail = function(error, obj) {
  if (obj.fail) obj.fail(error);
  if(!obj.noTip) wx.showToast({
    icon: 'none',
    title: `${obj.noErrorDetail ? obj.failTip||'未知错误': obj.failTip||'' + error}`
  });
};
BeautyRequest.prototype.beautyRequest = function(option, page, method) {
  let that = this;
  setPageState(page, -1, '');
  return new Promise((resolve, reject) => {
    let agent = Object.assign({}, this.requestOption, option);
    agent.success = (res) => {
      let httpState = res.statusCode;
      if (HTTPSUCCESSSTATE.indexOf(httpState) === -1) {
        if (httpState == 401) return this.on401();
        this.requestFail(httpState, option);
        setPageState(page, httpState, httpState);
        reject(httpState);
      } else {
        let data = Object.assign({}, this.resTemplate, res.data);
        this.handleResponse(data, option, page);
        setPageState(page, 200, '');
        resolve(data);
      }
    };
    agent.fail = (error) => {
      this.requestFail(error.errMsg, option);
      setPageState(page, 'error', error.errMsg || error.toString());
      reject(error.errMsg);
    };
    this.request[method](agent);
  });
};
['Get', 'Put', 'Post', 'Delete'].forEach(function(item) {
  BeautyRequest.prototype[`beauty${item}`] = function(obj, page) {
    return this.beautyRequest(obj, page, item.toLowerCase());
  };
});

BeautyRequest.prototype.beautyAll = function(obj, page) {
  let that=this;
  setPageState(page, -1, '');
  return new Promise(function(resolve, reject) {
    Promise.all(obj.params).then((datas) => {
      setPageState(page, 10000, '');
      for (let i = 0; i < datas.length; i++) {
        let data = datas[i];
        let msg = that.getMessage(data);
        let code = that.getCode(data);
        if (that.successCode.indexOf(code) === -1) {
          return that.requestFail(msg, obj);
        }
      }
      that.requestSuccess(datas, obj);
      resolve(datas);
    }).catch((error) => {
      setPageState(page, 'error', error);
      that.requestFail(error.errMsg, obj);
      reject(error);
    }).finally(function() {
      if (obj.complete) obj.complete();
    });
  })
};
// 请求构造函数的初始化
BeautyRequest.prototype.init = function(option) {
  this.requestOption = option || this.requestOption;
  this.request = new Request(this.requestOption);
}
export default BeautyRequest