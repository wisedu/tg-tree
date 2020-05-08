
const  utils = {};

utils.toTreeData = function(data, parent_id, options) {
  let opt = options || {ukey:"id", pkey:'parent_id', toCKey:'children'};
  var tree = [];
  var temp;
  for (var i = 0; i < data.length; i++) {
    if (data[i][opt.pkey] == parent_id || data[i][opt.ukey] === data[i][opt.pkey]) {
      var obj = data[i];
      temp = this.toTreeData(data, data[i][opt.ukey], opt);
      if (temp.length > 0) {
        obj[opt.toCKey] = temp;
      }
      tree.push(obj);
    }
  }
  return tree;
}


export default utils;