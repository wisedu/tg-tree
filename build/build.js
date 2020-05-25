const fs = require('fs');
const path = require('path');

const packageJSON = JSON.parse(fs.readFileSync("./package.json"));

const OUTPUT_PATH = path.join(__dirname, '../src/entry.js')

let template = 
`import mTree from './index.vue';
const version = "${packageJSON.version}";
const description = "${packageJSON.description}";
const author = "${packageJSON.author}";

const components = { mTree };
const install = function(Vue) {
  Vue.component(this.name, this);
};
mTree.install = install;

if (typeof window !== 'undefined' && window.Vue) {
  mTree.install(window.Vue);
}
export { version, description, author, mTree}
export default mTree;`

fs.writeFileSync(OUTPUT_PATH, template);
console.log('[build entry] DONE:' + OUTPUT_PATH);