<template>
  <span class="tree-breadcrumb-child">
    <span class="tree-breadcrumb-innner" @click.stop="clickHandle(item)">
      <slot>{{item.name}}</slot>
    </span>
    <svg class="tree-svg-breadcrumb tree-svg-color-default" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <path d="M568.00288375 512.01152332L384.41482981 333.95461835c-13.22866482-12.81382867-13.55131526-33.97047364-0.73748659-47.199138 0.23046473-0.23046473 0.50702186-0.460929 0.7374866-0.73748659 13.78177954-13.36694338 35.67591109-13.36694338 49.41159775 0l203.91502614 197.73857677c15.57940315 15.11847414 15.9942393 40.00864444 0.87576561 55.58804714l-0.82967276 0.82967274-203.91502613 197.73857631c-13.78177954 13.36694338-35.67591109 13.36694338-49.41159776 0-13.22866482-12.81382867-13.55131526-33.97047364-0.7374866-47.199138l0.7374866-0.73748659L568.00288375 512.01152332z"></path>
    </svg>
  </span>
</template>
<script>
  export default {
    name: 'tree-breadcrumb-item',
    props: {
      item: {
        type: Object,
        default: function(){
          return {}
        }
      }
    },
    data() {
      return {

      };
    },
    methods: {
      clickHandle(item){
        let index = this.$el.getAttribute('data-index');
        this.$emit('bread-click',item,Number(index));
      }
    },
    mounted() {
      
    }
  };
</script>
<style lang="css" scoped>
  .tree-breadcrumb-child {
    display: inline-flex;
    color: #43454F
  }
  .tree-breadcrumb-child:first-child {
    margin-left: 17px;
  }
  .tree-breadcrumb-child:last-child {
    padding-right: 30px;
    color: #3B7BFF;
  }
  .tree-breadcrumb-child:last-child > svg {
    display: none;
  }
  .tree-svg-breadcrumb {
    width: 18px;
    height: 18px;
  }
</style>