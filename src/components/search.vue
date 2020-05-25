<template>
  <div class="tree-search">
    <div class="tree-search-wrapper">
      <div class="tree-search-content">
        <i class="tree-icon-search">
          <svg class="tree-svg-search tree-svg-color-default" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path d="M414.5 746C231.6 746 82.9 597.5 82.9 414.3c0-182.7 148.7-331.6 331.6-331.6S746 231.6 746 414.3C746 597.5 597.3 746 414.5 746zM1024 965.3L735.3 676.6c60.7-73.9 93.8-166.7 93.6-262.3C828.9 185.5 643.4 0 414.5 0S0 185.5 0 414.3C0 643.5 185.6 829 414.5 829c99.5 0 190.8-35.4 262.2-93.7L965.4 1024l58.6-58.7z"></path>
          </svg>
        </i>
        <input type="search" v-model="currentValue" ref="tree-search" :placeholder="placeholder" class="tree-search-input" @input="onInput" @blur="onBlur" @focus="onFocus" @keypress="onKeypress">
      </div>
      <button class="search-button" @click="onSearch">搜索</button>
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
      this.$emit('on-change', e.target.value, e);
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
    },
    onSearch(e) {
      this.$emit('on-search', this.currentValue, e);
    }
  }
};
</script>
<style lang="css" scoped>
  .tree-search {
    padding: 9px 0 9px 17px;
    background: #FFFFFF;
    box-shadow: inset 0 -1px 0 0 #EDF2FB; 
  }
  .tree-search-wrapper {
    display: flex;
    line-height: 24px;
    font-size: 14px;
    border-radius: 6px;
    color: #43454F;
  }
  .tree-search-content {
    display: flex;
    flex: 1;
    background: #EDF2FB;
    padding-left: 5px;
  }
  .tree-icon-search {
    display: inline-flex;
    align-items: center;
    margin-right: 5px;
  }
  .tree-search-input {
    flex: 1;
    border: 0;
    margin: 0;
    padding: 4px 0;
    resize: none;
    display: block;
    font: inherit;
    color: inherit;
    background-color: transparent;
  }
  .tree-svg-search {
    width: 16px;
    height: 16px;
    vertical-align: middle;
  }
  .search-button {
    position: relative;
    color: #323233;
    background-color: #fff;
    border: 0;
    padding: 0 10px;
  }
  .search-button:active::before {
    opacity: 0.35;
  }
  .search-button::before {
    content: " ";
    position: absolute;
    top: 50%;
    left: 50%;
    opacity: 0;
    width: 100%;
    height: 100%;
    border: inherit;
    border-color: #000;
    background-color: #000;
    border-radius: inherit;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
  }
</style>