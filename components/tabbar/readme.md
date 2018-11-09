### 根据https://github.com/dt8888/tabbar改写

自定义Tabbar 使用navigation 切换页面，跳转时页面重新渲染会闪一下。为了避免这种效果，使用微信Tabbar 切换页面不会闪现，在app.js 中隐藏原生tabbar
#### app.json
```
"tabBar": {
    "backgroundColor": "#ffffff",
    "color": "#979795",
    "selectedColor": "#1c1c1b",
    "list": [
      {
      "pagePath": "pages/index/index",
      "text": "首页",
      "iconPath": "icon/icon_home.png",
      "selectedIconPath": "icon/icon_home_HL.png"
      },
      {
        "pagePath": "pages/mine/mine",
        "text": "我的",
        "iconPath": "icon/icon_mine.png",
        "selectedIconPath": "icon/icon_mine_HL.png"
      }
    ]
  }
  ```
#### app.js
```
//隐藏系统tabbar
wx.hideTabBar();
```
### 封装tabbar 组件
设置properties
```
tabbar: {
  type: Object,
  value: {}
}
```
判断iPhone X
```
const app = getApp();

data: {
    isIphoneX: app.globalData.systemInfo.model == "iPhone X" ? true : false,
  },
```
##### app.js>onLaunch>getSystemInfo
```
//获取设备信息
this.getSystemInfo();

getSystemInfo: function () {
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.globalData.systemInfo = res;
      }
    });
  },  
```
##### app.js globalData
```
systemInfo: null,//客户端设备信息
```
加入iPhone X 样式
##### tabbar.wxss
```
.tabbar_box.iphoneX-height{
    padding-bottom: 66rpx;
}
```
### 切换页面
在App.js中的onLaunch方法中用wx.hideTabBar() 隐藏系统自带的tabbar， 在globalData中加入自定义tabbar的参数，再加入editTabbar方法给tabBar.list配置中的页面使用。

##### app.js globalData
```
tabBar: {
  color: "#000000",
  selectedColor: "#0f87ff",
  backgroundColor: "#ffffff",
  borderStyle: "black",
  list: [{
    pagePath: "/pages/index/index",
    text: "主页",
    iconPath: "/image/my.png",
    selectedIconPath: "/image/mySelected.png",
    selected: true
  },
  {
    pagePath: "/pages/logs/logs",
    text: "通讯录",
    iconPath: "/image/my.png",
    selectedIconPath: "/image/mySelected.png",
    selected: false
  },      
  {
    pagePath: "/pages/my/my",
    text: "我的",
    iconPath: "/image/my.png",
    selectedIconPath: "/image/mySelected.png",
    selected: false
  }
  ]
}

```
##### app.js>onLaunch>editTabbar
```
editTabbar: function () {
    let tabbar = this.globalData.tabBar;
    let currentPages = getCurrentPages();
    let _this = currentPages[currentPages.length - 1];
    let pagePath = _this.route;
    
    (pagePath.indexOf('/') != 0) && (pagePath = '/' + pagePath);

    for (let i in tabbar.list) {
      tabbar.list[i].selected = false;
      (tabbar.list[i].pagePath == pagePath) && (tabbar.list[i].selected = true);
    }
    _this.setData({
      tabbar: tabbar
    });
  },
```
> getCurrentPages() 函数用于获取当前页面栈的实例，以数组形式按栈的顺序给出，第一个元素为首页，最后一个元素为当前页面。

### 引入其他页面
json
```
"usingComponents": {
    "tabbar": "/components/tabbar/tabbar"
  }
```
wxml
```
<tabbar tabbar="{{tabbar}}"></tabbar>
```
js
```
//获取应用实例
const app = getApp();

data: {
    tabbar: {},
  },

onLoad: function (options) {
    app.editTabbar();
  },
```