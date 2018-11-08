<h1>loading</h1>
<section>
  <h2>properties</h2>
  <ul>
    <li>
      <dl>
        <dt>code</dt>
        <dd>type: String</dd>
        <dd>value:Number</dd>
        <dd>请求返回时code值</dd>
      </dl>
    </li>
    <li>
      <dl>
        <dt>message</dt>
        <dd>type: String</dd>
        <dd>value:''</dd>
        <dd>请求返回的信息<dd>
      </dl>
    </li>
    <li>
      <dl>
        <dt>css</dt>
        <dd>type: String</dd>
        <dd>value:''</dd>
        <dd>更改loading处于加载态时的样式<dd>
      </dl>
    </li>
    <li>
      <dl>
        <dt>loading-css</dt>
        <dd>type: String</dd>
        <dd>value:''</dd>
        <dd>更改loading处于加载态时加载图标的样式<dd>
      </dl>
    </li>
    <li>
      <dl>
        <dt>loading-code</dt>
        <dd>type: Number</dd>
        <dd>value:-1</dd>
        <dd>定义loading加载态的code值<dd>
      </dl>
    </li>
    <li>
      <dl>
        <dt>success-code</dt>
        <dd>type: Number</dd>
        <dd>value:10000</dd>
        <dd>请求成功的code值<dd>
      </dl>
    </li>
  </ul>
</section>
<section>
  <h2>events</h2>
  <ul>
    <li>
      <dl>
        <dt>reloading</dt>
        <dd>加载失败时，点击重新加载会触发reloading事件</dd>
      </dl>
    </li>
  </ul>
</section>
<section>
  <h2>example</h2>
  <pre>
    &lt;model-loading 
    code="-1" 
    loading-code="-1" 
    success-code="10000"
    bindreloading="reloading" &gt;&lt;/model-loading&gt;
  </pre>
</section>