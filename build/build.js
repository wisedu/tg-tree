var fs = require('fs');
var path = require('path');

var packageJSON = JSON.parse(fs.readFileSync("./package.json"));

var OUTPUT_PATH = path.join(__dirname, '../src/entry.js')

let template = 
`import TgTree from './index.vue';
const version = "${packageJSON.version}";
const description = "${packageJSON.description}";
const author = "${packageJSON.author}";

const components = { TgTree };
const install = function(Vue) {
  Vue.component(this.name, this);
};
TgTree.install = install;

if (typeof window !== 'undefined' && window.Vue) {
  TgTree.install(window.Vue);
}
export { version, description, author, TgTree}
export default TgTree;`

fs.writeFileSync(OUTPUT_PATH, template);
console.log('[build entry] DONE:' + OUTPUT_PATH);