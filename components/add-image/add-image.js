Component({
  properties: {
    type:{
      type:String,
      value:'upload'
    },
    maxLength: {
      type: null,
      value: 4
    },
    title: {
      type: String,
      value: ''
    },
    items: {
      type: Array,
      value: []
    }
  },
  methods: {
    add: function () {
      let data = this.data;
      let that = this;
      wx.chooseImage({
        count: data.maxLength - data.items.length,
        success: function (res) {
          let array = that.data.items;
          res.tempFilePaths.forEach(function (url) {
            let packageUrl = {
              url: url,
              state: 'loading',
              lineOnUrl: ''
            };
            that.save(packageUrl);
            array.push(packageUrl);
          });
          that.setData({
            items: array
          });
        }
      })
    },
    remove: function (e) {
      let url = '';
      if (typeof e !== 'string') {
        url = e.currentTarget.dataset.url
      } else {
        url = e;
      }
      let array = this.data.items.filter(function (item, index) {
        return url != item.lineOnUrl;
      });
      this.setData({
        items: array
      });
      this.triggerEvent('upload', {
        urls: this.data.items
      }, {})
    },
    save: function (packageUrl) {
      let that = this;
      wx.uploadFile({
        url: config.XiaoChengXuUploadFileImg,
        filePath: packageUrl.url,
        name: 'file',
        success(res) {
          let data = JSON.parse(res.data);
          if (data.Code == 10000) {
            packageUrl.state = 'success';
            packageUrl.lineOnUrl = data.Data;
            console.log('lineon url', data.Data);
            that.setData({
              items: that.data.items
            })
            that.triggerEvent('upload', {
              urls: that.data.items
            }, {})
          } else {
            packageUrl.state = 'fail'
            that.setData({
              items: that.data.items
            })
            setTimeout(function () {
              that.remove(packageUrl.url);
            }, 2000)
          }
        },
        fail: function () {
          packageUrl.state = 'fail';
          that.setData({
            items: that.data.items
          })
          setTimeout(function () {
            that.remove(packageUrl.url);
          }, 2000)
        }
      })
    }
  }
})