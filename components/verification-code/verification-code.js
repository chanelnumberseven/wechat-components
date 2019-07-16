Component({
  properties:{
    text:{
      type:String,
      value: '获取验证码'
    },
    phone:{
      type:String
    },
    countLimit:{
      type:Number,
      value:60
    },
    disabled:{
      type:Boolean
    }
  },
  data:{
    count:60,
    timeId:null
  },
  methods:{
    verifyPhone:function(){
      let phone=this.data.phone||'';
      if(!phone){
        wx.showToast({
          icon: 'none',
          title: '亲输入手机号码'
        });
        return false;
      }
      if(phone.length!=11||phone[0]!=1){
        wx.showToast({
          icon: 'none',
          title: '手机号码格式错误'
        });
        return false;
      }
      return true;
   }, 
   getCode:function(){
     // avoid count many times
     if(!this.verifyPhone()) return;
     if (this.timeId !== null) return;
     let data = this.data; 
     this.ajax.beautyPost({
       url:'',
       params:{},
       success:()=>{
         this.cutDown()
       }
     })
   }, 
   cutDown:function () {
      // reset count's value
      this.setData({
        count: this.data.countLimit
      });
      // improve user experience 
      this.setData({
        text: (--this.data.count) + 's',
        className: 'grey',
        count:this.data.count
      });
      // update the getCodeBtn's text;
      this.timeId = setInterval(() => {
        if (this.count > 1) return this.setData({
          text: (--this.data.count) + 's',
          className: 'grey',
          count:this.data.count
        });

        clearInterval(this.data.timeId);
        this.setData({
          className: '',
          text: '获取验证码',
          count: this.countLimit,
          timeId: null
        });
      }, 1000);
    }
  }
})