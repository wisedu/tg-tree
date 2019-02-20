<template>
  <div class="tree-search">
    <div class="tree-search-wrapper">
      <i class="tree-icon-search">
        <svg aria-hidden="true">
          <use xlink:href="#search"></use>
        </svg>
      </i>
      <input type="search" v-model="currentValue" ref="tree-search" :placeholder="placeholder" class="tree-search-input" @input="onInput" @blur="onBlur" @focus="onFocus" @keypress="onKeypress">
    </div>
  </div>
</template>

<script>
export default {
  name: 'tree-search',
  data(){
    return {
      currentValue: this.value
    }
  },
  props: {
    value: {},
    placeholder: {
      type: String,
      default: '搜索'
    }
  },
  watch: {
    value: function(val){
      this.currentValue = val;
    },
    currentValue: function(val){
      this.$emit('input',val);
    }
  },
  methods: {
    onInput(e) {
      this.$emit('on-change', this.currentValue, e);
    },
    onBlur(e) {
      this.$emit('on-blur', this.currentValue, e);
    },
    onFocus(e) {
      this.$emit('on-focus', this.currentValue, e);
    },
    onKeypress(e) {
      // press enter
      if (e.keyCode === 13) {
        e.preventDefault();
        this.$emit('on-search', this.currentValue, e);
      }
    }
  }
};
</script>
<style lang="css" scoped>
  .tree-search {
    padding: 9px 17px;
    background: #FFFFFF;
    box-shadow: inset 0 -1px 0 0 #EDF2FB; 
  }
  .tree-search-wrapper {
    display: flex;
    width: 100%;
    line-height: 24px;
    font-size: 14px;
    background: #EDF2FB;
    border-radius: 6px;
    color: #43454F;
    padding: 4px 5px 4px 5px;
  }
  .tree-icon-search {
    display: inline-flex;
    align-items: center;
    margin-right: 5px;
  }
  .tree-search-input {
    border: 0;
    margin: 0;
    padding: 0;
    width: 100%;
    resize: none;
    display: block;
    font: inherit;
    color: inherit;
    box-sizing: border-box;
    background-color: transparent;
  }
</style>