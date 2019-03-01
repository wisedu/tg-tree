import loadSprite from './load-spirte.js';
import TgTree from './components/tg-tree.vue';
const version = "0.0.5";
const description = "A mobile tree component by Vue";
const author = "金智教育 wisedu";
const components = {
    TgTree
};
loadSprite();
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
export { version, description, author}
export default Object.assign({}, {install, ...components});