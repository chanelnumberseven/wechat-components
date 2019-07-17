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
    value:{
      type:Number,
      observer:function(value){
        this.setData({
          number:value
        })
      }
    }
  },
  data: {
    number: 0,
    plusDisabled: false,
    minusDisabled: false
  },
  attached:function(){
    this.init();
  },
  ready:function(){
    this.init();
  },
  observers:{
    number:function(){
      this.btnAble();
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
      let value=++this.data.number;
      if(value>max) value=max;
      this.setData({
        number:value
      })
    },
    manus:function(){
      let min=this.data.min;
      let value = --this.data.number;
      if (value<min) value = min;
      this.setData({
        number: value
      })
    },
    btnAble:function(){
      let value=this.data.number;
      this.setData({
        plusDisabled: value >=this.data.max,
        minusDisabled:value<=this.data.min
      });
    }
  }
})