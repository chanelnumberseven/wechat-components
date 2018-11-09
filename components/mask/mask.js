Component({
  properties: {
    visible: {
      type: Boolean,
      value: false,
      observer:function(newValue,oldValue){
        if(!newValue){
          this.triggerEvent('hide', {}, {
            bubbles: true,
            composed: true
          })
        }else{
          this.triggerEvent('show', {}, {
            bubbles: true,
            composed: true
          })
        }
      }
    },
    css: {
      type: String,
      value: ''
    },
    autoClose: {
      type: null,
      value: true
    },
    position:{
      type:String,
      value:'middle'
    }
  },
  data: {
    animation: 'animation-fade-in'
  },
  methods: {
    hide: function () {
      if (this.data.autoClose) {
        this.setData({
          visible: false
        })
      }
    }
  }
})