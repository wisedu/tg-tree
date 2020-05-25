import mTree from './index.vue';
const version = "1.1.1";
const description = "A mobile tree component by Vue";
const author = "金智教育 wisedu";

const components = { mTree };
const install = function(Vue) {
  Vue.component(this.name, this);
};
mTree.install = install;

if (typeof window !== 'undefined' && window.Vue) {
  mTree.install(window.Vue);
}
export { version, description, author, mTree}
export default mTree;