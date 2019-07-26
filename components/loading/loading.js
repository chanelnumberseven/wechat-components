Component({
  properties: {
    code: {
      type: null,
      value: -1,
      observer:function(value){
        let data=this.data;
        this.setData({
          contentShow:value===data.loadingCode||data.successCode.indexOf(value)!==-1
        })
      }
    },
    message: {
      type: String,
      value: ''
    },
    noError:{
      type:Boolean
    },
    css: {
      type: String,
      value: ''
    }
  },
  data:{
    contentShow:true,
    loadingCode:-1,
    successCode:[10000,200]
  },
  methods: {
    reloading: function () {
      this.triggerEvent('reloading', {}, {})
    }
  }
})