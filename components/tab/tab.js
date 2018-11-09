Component({
  options: {
    multipleSlots: true
  },
  properties: {
    length:{
      type:Number,
      value:0
    },
    items: {
      type: Array,
      value: []
    },
    itemKey: {
      type: String,
      value: 'name'
    },
    currentPageIndex: {
      type: null,
      value: 0
    },
    css: {
      type: String,
      value: ''
    },
    position: {
      type: String,
      value: 'top'
    }
  },
  methods: {
    tab: function (e) {
      this.setData({
        currentPageIndex: e.currentTarget.dataset.index
      })
    },
    change: function (e) {
      this.setData({
        currentPageIndex: e.detail.current
      })
    }
  }
})