// pages/components/single-selection/single-selection.js
Component({
  options: {
    multipleSlots: true
  },
  properties: {
    label: {
      type: String,
      value: ''
    },
    require:{
      type:null,
      value:false
    },
    labelStyle:{
      type:null,
      value:'width:4em;white-space:nowrap'
    },
    css:{
      type:null,
      value:''
    },
    type:{
      type:String,
      value:''
    }
  },
  methods: {
    tap:function(){
      this.triggerEvent('itemtap', {}, {});
    }
  }
})