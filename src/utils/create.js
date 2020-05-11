import bem from 'src/components/mixins/bem'
import { isDef } from 'utils'

const install = function(Vue) {
  Vue.component(this.name, this);
};

export default function(sfc) {
	sfc.name = 'tree-' + sfc.name;
  sfc.install = sfc.install || install;
  sfc.mixins = sfc.mixins || [];
  sfc.mixins.push(bem);
  sfc.methods = sfc.methods || {};
  sfc.methods.isDef = isDef;
  return sfc;
};