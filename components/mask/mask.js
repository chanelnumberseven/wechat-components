Component({
  properties: {
    visible: {
      type: Boolean,
      value: false,
      observer: function(newValue, oldValue) {
        if (!newValue) {
          this.triggerEvent('hide', {
            value: newValue
          }, {
            bubbles: true,
            composed: true
          })
        } else {
          this.triggerEvent('show', {}, {
            bubbles: true,
            composed: true
          })
        }
        this.triggerEvent('toggle', {
          value: newValue
        }, {})
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
    position: {
      type: String,
      value: 'middle'
    },
    animation:{
      type:null,
      value:''
    }
  },
  methods: {
    hide: function() {
      if (this.data.autoClose) {
        this.setData({
          visible: false
        })
      }
    }
  }
})