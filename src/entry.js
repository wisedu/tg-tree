import utils from './components/utils.js';
import loadSprite from './load-spirte.js';
import BreadcrumbItem from './components/breadcrumb-item.vue';
import Breadcrumb from './components/breadcrumb.vue';
import Cell from './components/cell.vue';
import CheckboxList from './components/checkbox-list.vue';
import RadioList from './components/radio-list.vue';
import Search from './components/search.vue';
import TgTree from './components/tg-tree.vue';
const version = "0.0.2";
const description = "A mobile tree component by Vue";
const author = "金智教育 wisedu";
const components = {
    BreadcrumbItem,Breadcrumb,Cell,CheckboxList,RadioList,Search,TgTree
};
loadSprite();
const install = function (Vue, opts = {}) {
    if (install.installed) return;
    Object.keys(components).forEach((key) => {
        if (key === "utils"||key === "loadSprite") return;
        Vue.component(components[key].name, components[key]);
    });
};
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}
export { version, description, author}
export default Object.assign({}, {install, ...components});