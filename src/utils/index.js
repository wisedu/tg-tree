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
//将多维数据转成一维数组
function treeToArr(treeData){
  var arrData=[]
  var dataHandle=function(data){
      for(var n=0;n<data.length;n++){
           let item=data[n];
           arrData.push(item)
           if(item.children){
             dataHandle(item.children)
           }
      }
  }
  dataHandle(treeData);
  return arrData
}

export {
	toTreeData,
  treeToArr,
  isDef,
  isServer
}
