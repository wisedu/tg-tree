export default {
  id: 1,
  zIndex: 3000,
  stack: [],
  lockCount: 0,

  plusKey(key) {
    return this[key]++;
  },

  get top() {
    return this.stack[this.stack.length - 1];
  }
};
