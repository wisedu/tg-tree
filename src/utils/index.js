import Vue from 'vue'
const isServer = Vue.prototype.$isServer

function toTreeData(data, parent_id, options) {
  let opt = options || {ukey:"id", pkey:'parent_id', toCKey:'children'};
  let tree = [];
  let temp;
  for (let i = 0; i < data.length; i++) {
    if (data[i][opt.pkey] == parent_id || data[i][opt.ukey] === data[i][opt.pkey]) {
      let obj = data[i];
      temp = toTreeData(data, data[i][opt.ukey], opt);
      if (temp.length > 0) {
        obj[opt.toCKey] = temp;
      }
      tree.push(obj);
    }
  }
  return tree;
}

function isDef(value) {
  return value !== undefined && value !== null;
}

export {
  toTreeData,
  isDef,
  isServer
}
