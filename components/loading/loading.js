Component({
  properties: {
    code: {
      type: null,
      value: -1
    },
    loadingCode:{
      type:Number,
      value:-1
    },
    successCode:{
      type: Number,
      value: 10000
    },
    message: {
      type: String,
      value: ''
    },
    css: {
      type: String,
      value: ''
    },
    loadingCss:{
      type: String,
      value: 'font-size:30px'
    }
  },
  methods: {
    reloading: function () {
      this.triggerEvent('reloading', {}, {})
    }
  }
})