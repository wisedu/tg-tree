
const Index = resolve => require(['./pages/index.vue'], resolve)

export default {
    routes: [
        { path: '/', component: Index }
    ]
};