import date from './date';
function getType(data) {
  let type = Object.prototype.toString;
  getType = function (data) {
    return type.call(data).split(' ')[1].replace(']', '').toLowerCase();
  }
  return type.call(data).split(' ')[1].replace(']', '').toLowerCase();
}
function getParamsUrl(url, params) {
  let value = [];
  let urlParam = url.split('?')[1];
  if (getType(params) !== 'object') return url;
  Object.keys(params).forEach(function (key) {
    let val = params[key];
    if (val != null) value.push(`${encodeURIComponent(key)}=${encodeURIComponent(val)}`);
  });
  if (!value.length) return url;
  if (!urlParam) return `${url.replace(/\?/g, '')}?${value.join('&')}`;
  return `${url.replace(/\?/g, '')}?${value.join('&')}&${urlParam}`;
}
module.exports = {
  ...date,
  getParamsUrl,
  getType
}
