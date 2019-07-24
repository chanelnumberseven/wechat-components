Component({
  properties:{
    css:{
      type:String
    },
    list:{
      type:[Array,Object]
    },
    valueWidth:{
      type:String
    }
  },
  methods:{
    tap:function(e){
      let event=e.currentTarget.dataset.event;
      if(!event) return;
      this.triggerEvent(event);
    }
  }
})