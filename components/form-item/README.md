<h1>表单项</h1>
<section>
  <h2>properties</h2>
  <ul>
    <li>
      <dl>
        <dt>label</dt>
        <dd>type:String<dd>
        <dd>value:''</dd>
        <dd>定义表单项input 对应的label的文本<dd>
      </dl>
    </li>
    <li>
      <dl>
        <dt>labelStyle</dt>
        <dd>type:String<dd>
        <dd>value:''</dd>
        <dd>定义表单项label的样式<dd>
      </dl>
    </li>
    <li>
      <dl>
        <dt>css</dt>
        <dd>type:String<dd>
        <dd>value:''</dd>
        <dd>定义表单项的样式<dd>
      </dl>
    </li>
  </ul>
</section>
<section>
 <h2>event</h2>
 <ul>
   <li>
     <dl>
       <dt>itemtap</dt>
       <dd>表单项被点击时会触发itemtap事件</dd>
     </dl>
   </li>
 </ul>
</section>
<section>
  <h2>example</h2>
  <pre>
    <form-item title="来访日期">
      <input slot="body" placeholder="点击选择来访日期"/>
      <model-icon type="link"></model-icon>
    </form-item>
    <form-item>
      <form-image title="故障照片"></form-image>
    </form-item>
    <form-item title="故障类型">
      <input slot="body" value="无"/>
    </form-item>
  </pre>
  <figure>
    <img src="https://chanelnumberfive.github.io/easy-open-door-components/images/form-item.png"/>
    <figcaption>form-item</figcaption>
  <figure>
</section>