import Vue from 'vue'
const isServer = Vue.prototype.$isServer

function toTreeData(data, parent_id, options, checked) {
  let opt = options || {ukey:"id", pkey:'parent_id', toCKey:'children'};

  // 校验树的源数据，消除源数据 id == parent_id 引起的死循环
  checked = checked || false;
  if(!checked) {
    data = data.map((item,index) => {
      if(item[opt.ukey] === item[opt.pkey]) {
        console.error("第" + (index + 1) + "数据不符合要求：", item);
        item[opt.pkey] = parent_id;
      }
      return item;
    })
    checked = true;
  }

  let tree = [];
  let temp;
  for (let i = 0; i < data.length; i++) {
    if (data[i][opt.pkey] == parent_id || data[i][opt.ukey] === data[i][opt.pkey]) {
      let obj = data[i];
      temp = toTreeData(data, data[i][opt.ukey], opt, checked);
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
