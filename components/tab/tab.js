Component({
  options: {
    multipleSlots: true
  },
  properties: {
    separator:{
      type:Boolean
    },
    length: {
      type:Number
    },
    items: {
      type: Array,
      value:null
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
    swiperCss: {
      type: String,
      value: ''
    },
    tabNavCss:{
      type:String
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
      });
      this.triggerEvent('change', { index: e.detail.current }, {});
    }
  }
})