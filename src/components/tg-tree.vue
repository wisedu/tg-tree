<template>
  <div class="tg-tree">
    <tree-search v-model="value" :placeholder="placeholder"  @on-search="searchHandle"></tree-search>
    <tree-breadcrumb>
      <tree-breadcrumb-item v-for="item in options" :key="item.id" :item="item" @item-click="itemHandle" ></tree-breadcrumb-item>
    </tree-breadcrumb>
    <div style="height:100px;background: #fff;"></div>
  </div>
</template>

<script>
import TreeSearch from './search';
import TreeBreadcrumb from './breadcrumb';
import TreeBreadcrumbItem from './breadcrumb-item';
export default {
  name: 'tree-tree',
  components: {
    [TreeSearch.name]: TreeSearch,
    [TreeBreadcrumb.name]: TreeBreadcrumb,
    [TreeBreadcrumbItem.name]: TreeBreadcrumbItem
  },
  data(){
    return {
      value: '111',
      placeholder: "placeholder",
      options: [
        {label: '全部',id:'001'},
        {label: '活动管理',id:'002'},
        {label: '活动列表',id:'003'},
        {label: '活动详情1',id:'004'},
        {label: '活动详情2',id:'005'},
        {label: '伪页面伪页面',id:'006'},
        {label: '当前页',id:'007'}
      ]
    }
  },
  props: {

  },
  methods: {
    itemHandle(item,index){
      this.options.splice(index+1);
    },
    handleChange(value) {
      console.log(value)
    },
    searchHandle(value,e){
      console.log(value,e)
    }
  }
};
</script>
<style lang="css">
  .tg-tree .tree-breadcrumb {
    margin-bottom: 5px;
  }
</style>