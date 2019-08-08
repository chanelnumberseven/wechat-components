Component({
  properties:{
    min:{
      type:Number,
      value:0
    },
    max:{
      type:Number,
      value:1000
    },
    val:{
      type:Number,
      value:0
    },
    unInput:{
      type:Boolean,
      value:false
    }
  },
  data: {
    plusDisabled: false,
    minDisabled: false
  },
  attached:function(){
    this.init();
  },
  ready:function(){
    this.init();
  },
  observers:{
    val:function(value){
      this.btnAble();
      this.triggerEvent('change', {
        value: this.valueCheck()
      });
    },
    min:function(){
      this.btnAble();
    },
    max:function(){
      this.btnAble()
    }
  },
  methods:{
    init:function(){
      this.btnAble();
    },
    plus:function(){
      let max = this.data.max;
      let value=++this.data.val;
      this.setData({
        val:value
      });
    },
    manus:function(){
      let min=this.data.min;
      let value = --this.data.val;
      this.setData({
        val: value
      })
    },
    btnAble:function(){
      let value=this.data.val;
      this.setData({
        plusDisabled: value >=this.data.max,
        minDisabled:value<=this.data.min
      });
    },
    input:function(e){
      let value=e.detail.value;
      this.setData({
        val:value
      })
    },
    valueCheck:function(){
      let value = parseInt(this.data.val);
      let agent=value;
      let min=this.data.min;
      let max=this.data.max;
      if (value < min) agent = min;
      if (value > max) agent = max;
      if(agent!==value) this.setData({
        val:agent
      });
      return agent;
    }
  }
})