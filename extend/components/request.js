function getType (data) {
  let type = Object.prototype.toString;
  getType = function (data) {
    return type.call(data).split(' ')[1].replace(']', '').toLowerCase();
  }
  return type.call(data).split(' ')[1].replace(']', '').toLowerCase();
}
function Request(config={}){
  this.requestTasks=[];
  this.config=config;
  this.baseUrl=config.baseUrl;
}
function stitchingUrl(url,host){
  if(url.slice(0,4)==='http') return url;
  if(host){
    if(url.slice(0,1)!=='/') url=`/${url}`;
    if(host.slice(host.length-1)==='/') host=host.slice(0,host.length-1);
    return `${host}${url}`;
  }
  throw new Error('You should assign an host for request');
}
Request.prototype.sendRequest=function(config){
  let complete = config.complete;
  let task = null;
  let tasks=this.requestTasks;
  config.complete = ()=>{
    if (complete) complete();
    this.requestTasks =tasks.filter(function (item) {
      return item !== task;
    });
  };
  config.url = stitchingUrl(config.url,this.baseUrl);
  task = wx.request(config);
  tasks.push(task);
  return task;
};
Request.prototype.abort=function(){
  this.requestTasks.forEach(function(item){
    item.abort();
  });
  this.requestTasks=[];
};
Request.prototype.getParamsUrl=function(url,params){
  let value=[];
  let urlParam=url.split('?')[1];
  if (getType(config.params) !== 'object') return url;
  Object.keys(params).forEach(function(key){
    let val=params[key];
    if (val != null) value.push(`${encodeURIComponent(key)}=${encodeURIComponent(val)}`);
  });
  if(!value.length) return url;
  if(!urlParam) return `${url.replace(/\?/g,'')}?${value.join('&')}`;
  return `${url.replace(/\?/g,'')}?${value.join('&')}&${urlParam}`;
};
Request.prototype.get=function(config){
  config.method='GET';
  config.url = this.getParamsUrl(config.url, config.params);
  if(config.params) delete config.params;
  return this.sendRequest(config);
};
Request.prototype.post = function (config) {
  config.method = 'POST';
  return this.sendRequest(config);
};
Request.prototype.put = function (config) {
  config.method = 'PUT';
  return this.sendRequest(config);
}
Request.prototype.delete = function (config) {
  config.method = 'DELETE';
  config.url = this.getParamsUrl(config.url, config.params);
  if (config.params) delete config.params;
  return this.sendRequest(config);
}
export default Request