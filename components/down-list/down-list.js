Component({
  options: {
    multipleSlots: true
  },
  properties: {
    css: {
      type: String,
      value: ''
    },
    disabled:{
      type:Boolean,
      value:false
    }
  },
  data: {
    listVisible: true
  },
  methods: {
    block: function () {
      this.setData({
        listVisible: !this.data.listVisible
      })
    }
  }
}) 