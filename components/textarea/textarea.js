Component({
  properties:{
    placeholder:{
      type:String,
      value:'请输入内容'
    },
    value:{
      type:String
    },
    max:{
      type:[String,Number],
      value:200
    }
  },
  data:{
    current:0
  },
  methods:{
    check:function(e){
      let value=e.detail.value||'';
      let max=this.data.max;
      let length=value.length;
      this.setData({
        current:length
      });
      this.triggerEvent('input',{
        value:value
      })
    }
  }
})