let config = {
  noEmpty: {
    value: '',
    rule: [
      [1, Infinity]
    ],
    emptyTip: '值不能为空'
  },
  phone: {
    value: '',
    rule: [
      [11, 11], '^1[3456789]'
    ],
    emptyTip: '请输入手机号码',
    errorTip: '手机号码格式错误'
  },
  password: {
    value: '',
    rule: [
      [1, 16]
    ],
    emptyTip: '请输入密码',
    errorTip: '密码格式不正确'
  },
  repeat: {
    value: '',
    rule: [
      false,
      false,
      function(obj) {
        let values = obj.value.split(' ');
        return values[0] === values[1];
      }
    ],
    emptyTip: '请再次输入密码',
    errorTip: '密码输入不一致'
  },
  code: {
    value: '',
    rule: [
      [4, 6]
    ],
    emptyTip: '请输入验证码',
    errorTip: '验证码格式错误'
  }
};

// validate constructor
function Validate() {
  
}

// validate the value
function isCorrect(obj) {
  var tipLength = true,
    regular = true,
    customs = true,
    val = obj.value + '',
    rule = obj.rule;
  if (rule[0]) {
    tipLength = val.length >= rule[0][0] && val.length <= rule[0][1];
  }
  if (rule[1]) {
    regular = new RegExp(rule[1], 'g');
    regular = regular.test(val);
  }
  if (rule[2]) {
    customs = rule[2](obj);
  }
  return tipLength && regular && customs;
}

// error tip
function errorTip(obj, errorFn) {
  if (!obj.value) {
    if (errorFn) {
      errorFn(obj.emptyTip, obj)
    } else {
      wx.showToast({
        icon: 'none',
        title: obj.emptyTip
      });
    }
    obj.error = true;
  } else if (!isCorrect(obj)) {
    if (errorFn) {
      errorFn(obj, errorTip, obj)
    } else {
      wx.showToast({
        icon: 'none',
        title: obj.errorTip || obj.emptyTip
      });
    }
    obj.error = true;
  } else {
    obj.error = false;
  }
}

// the first time validate
Validate.prototype.validate = function(option) {
  var copy = this.option = {},
    keys = Object.keys(option),
    l = keys.length,
    i = 0,
    key = '',
    configKey = '';
  for (; i < l; i++) {
    key = keys[i];
    configKey = key.replace(/\d+/g, '');
    copy[key] = {};
    Object.assign(copy[key], config[configKey] || {}, option[key]);
  };

  // filter the property which's value type is a function
  this.keys = keys.filter(function(value, index) {
    return value.slice(0, 2) !== 'on';
  });
  normalValidate.call(this, option);
  this.validate = normalValidate;
}

// normal validate
function normalValidate(option) {
  var copy = this.option,
    keys = this.keys,
    l = keys.length,
    i = 0,
    key = '',
    canSubmit = true;
  for (; i < l; i++) {
    key = keys[i];
    copy[key].value = option[key].value;
    errorTip(copy[key], option.onError);
    if (copy[key].error) {
      canSubmit = false;
      break;
    }
  };
  canSubmit && option.onSubmit && option.onSubmit();
}

export default Validate