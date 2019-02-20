<template>
  <span class="tree-breadcrumb-child">
    <span class="tree-breadcrumb-innner" @click.stop="clickHandle(item)">
      <slot>{{item.name}}</slot>
    </span>
    <svg aria-hidden="true"  class="tree-svg">
      <use xlink:href="#arrow-right"></use>
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
        var index = this.$el.getAttribute('data-index');
        this.$emit('bread-click',item,Number(index));
      }
    },
    mounted() {
      
    }
  };
</script>
<style lang="css">
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
</style>>