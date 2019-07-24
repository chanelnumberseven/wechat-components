Component({
  properties: {
    src: {
      type: String,
      value: ''
    },
    css: {
      type: String,
      value: ''
    },
    defaultSrc:{
      type:String,
      value: './default.svg'
    }
  },
  data:{
    loadState:0,
    default:'display:block;height:100px;width:100px;background-color:#f2f2f2;',
    success:'background-color:rgba(0,0,0,0);'
  },
  methods:{
    fail:function(){
      this.setData({
        loadState:0
      })
    },
    load: function () {
      this.setData({
        loadState: 1
      })
    }
  }
})