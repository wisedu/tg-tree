<template>
  <div class="tree-selector-footer">
    <div class="tree-selector-footer-detail" :class="[count?'tree-color-primary':'tree-color-disabled']"  @click="$_checkDetail">
      <label >查看已选(<span>{{count}}</span>)</label>
      <svg class="tree-svg" :class="[count?'tree-svg-color-primary':'tree-svg-color-default']" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <path d="M568.00288375 512.01152332L384.41482981 333.95461835c-13.22866482-12.81382867-13.55131526-33.97047364-0.73748659-47.199138 0.23046473-0.23046473 0.50702186-0.460929 0.7374866-0.73748659 13.78177954-13.36694338 35.67591109-13.36694338 49.41159775 0l203.91502614 197.73857677c15.57940315 15.11847414 15.9942393 40.00864444 0.87576561 55.58804714l-0.82967276 0.82967274-203.91502613 197.73857631c-13.78177954 13.36694338-35.67591109 13.36694338-49.41159776 0-13.22866482-12.81382867-13.55131526-33.97047364-0.7374866-47.199138l0.7374866-0.73748659L568.00288375 512.01152332z"></path>
      </svg>
    </div>
    <div class="tree-selecter-footer-comfirm">
      <tree-button type="primary" round @btn-click="$_confirm" :disabled="!count">确定</tree-button>
    </div>
  </div>
</template>

<script>
import TreeButton from './button';
export default {
  name: 'tree-selector-footer',
  components: {
    [TreeButton.name]: TreeButton
  },
  data(){
    return {
      currentValue: this.value,
      count: this.value.length
    }
  },
  props: {
    value: {},
  },
  watch: {
    value: function(val){
      this.count = val.length;
      this.currentValue = val;
    },
    currentValue: function(val){
      this.$emit('input',val);
    }
  },
  methods: {
    $_checkDetail: function(){
      if(!this.count) return;
      console.log('detail')
    },
    $_confirm: function(){
      console.log('confirm')
    }
  }
};
</script>
<style lang="css" scoped>
  .tree-selector-footer {
    padding: 0 17px;
  }
  .tree-selector-footer:after {
    display: block;
    content: '';
    clear: both;
  }
  .tree-selector-footer-detail {
    float: left;
    display: flex;
    align-items: center;
    width: 66.67%;
    line-height: 36px;
  }
  .tree-selecter-footer-comfirm {
    float: left;
    width: 33.33%;
  }
  .tree-svg {
    width: 21px; 
    height: 21px;
    vertical-align: middle;
    overflow: hidden;
  }
</style>