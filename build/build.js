var fs = require('fs');
var path = require('path');

var packageJSON = JSON.parse(fs.readFileSync("./package.json"));

var OUTPUT_PATH = path.join(__dirname, '../src/entry.js')

let template = 
`import TgTree from './index.vue';
const version = "${packageJSON.version}";
const description = "${packageJSON.description}";
const author = "${packageJSON.author}";
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
export default Object.assign({}, {install, TgTree});`

fs.writeFileSync(OUTPUT_PATH, template);
console.log('[build entry] DONE:' + OUTPUT_PATH);