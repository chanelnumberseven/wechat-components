Component({
  properties:{
    value:{
      type:Number,
      value:300
    },
    css:{
      type:String
    }
  },
  data: {
    timeString:'00时00分00秒'
  },
  timerId: null,
  count:0,
  lifetimes: {
    attached: function () {
      this.start();
    },
    moved:function(){
      this.destroy();
    },
    detached: function () {
      this.destroy();
    }
  },
  methods: {
    to24: function(number) {
      return number > 9 ? number : `0${number}`;
    },
    start: function(fn) {
      this.count=this.data.value;
      clearInterval(this.timerId);
      this.timerId = setInterval(() => {
        this.count--;
        this.toClock();
        if (this.count <= 0){
          clearInterval(this.timerId);
          this.triggerEvent('end');
        };
      }, 1000);
    },
    destroy: function() {
      clearInterval(this.timerId);
    },
    toClock: function() {
      let count = this.count;
      let hours = parseInt(count / 3600);
      let minuts = parseInt(count % 3600 / 60);
      let second = parseInt(count % 60);
      this.setData({
        timeString: `${this.to24(hours)}时${this.to24(minuts)}分${this.to24(second)}秒`
      });
    }
  }
})