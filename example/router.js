
const Index = resolve => require(['./index.vue'], resolve)

export default {
    routes: [
        { path: '/', component: Index }
    ]
};