Component({
  properties:{
    css:{
      type:String
    },
    list:{
      type:[Array,Object],
      observer:function(value){
        this.init();
      }
    },
    valueWidth:{
      type:String
    },
    border:{
      type:Boolean
    }
  },
  data:{
    listSelf:[]
  },
  methods:{
    init:function(){
      let agent = [];
      let list=this.data.list;
      if (list.nv_constructor === 'Object') {
        Object.keys(list).forEach(function (key) {
          agent.push({
            label: key,
            value: list[key]
          })
        })
      }else{
        agent=list;
      }
      this.setData({
        listSelf: agent
      });
    },
    tap:function(e){
      let event=e.currentTarget.dataset.event;
      if(!event) return;
      this.triggerEvent(event);
    }
  }
})