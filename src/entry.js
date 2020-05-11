import TgTree from './index.vue';
const version = "1.0.0";
const description = "A mobile tree component by Vue";
const author = "金智教育 wisedu";
const components = { TgTree};
const install = function (Vue, opts = {}) {
  if (install.installed) return;
  Object.keys(components).forEach((key) => {
    if (key === "loadSprite") return;
    Vue.component(components[key].name, components[key]);
  });
};
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
export { version, description, author, TgTree}
export default Object.assign({}, {install, TgTree});