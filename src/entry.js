import TgTree from './index.vue';
const version = "1.1.5";
const description = "A mobile tree component by Vue";
const author = "金智教育 wisedu";

const install = function(Vue) {
  Vue.component(this.name, this);
};
TgTree.install = install;

if (typeof window !== 'undefined' && window.Vue) {
  TgTree.install(window.Vue);
}
export { version, description, author, TgTree}
export default TgTree;