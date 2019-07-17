import QRCode from './weapp-qrcode'
Component({
  properties:{
    width:{
      type:[Number,String],
      value:110
    },
    height: {
      type: [Number, String],
      value: 110
    },
    value:{
      type:String,
      value:'',
      observer:function(value){
        this.draw(value);
      }
    },
    css:{
      type:String
    }
  },
  data:{
    src:''
  },
  attached: function () {
    this.draw(this.data.value);
  },
  methods:{
    draw(url) {
      this.setData({
        src: false
      });
      let qrcode = new QRCode('canvas', {
        usingIn: this,
        text: "code=0000000000000",
        width: this.data.width,
        height:this.data.height,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.L,
      });
      qrcode.makeCode(url, () => {
        setTimeout(()=>{
          this.toImagePath()
        }, 300)
      });
    },
    toImagePath: function () {
      let width=this.data.width;
      let height=this.data.height;
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width:width,
        height:height,
        destWidth:width,
        destHeight:height,
        canvasId: 'canvas',
        success: (res) => {
          this.setData({
            src: res.tempFilePath
          })
        },
        fail() {
          console.log('tempFilePath fail');
        }
      })
    }
  }
})