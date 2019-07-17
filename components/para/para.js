// components/base/headline/headline.js
Component({
  properties: {
    level: {
      type: [Number, String],
      value: 1
    },
    css: {
      type: String,
      value: ''
    }
  },
  data: {
    styles: [
      'font-size:15px;'
    ]
  }
})