<template>
  <div class="tg-tree">
    <tree-search v-model="value" :placeholder="placeholder"  @on-search="searchHandle"></tree-search>
    <tree-breadcrumb>
      <tree-breadcrumb-item v-for="item in options" :key="item.id" :item="item" @item-click="itemHandle" ></tree-breadcrumb-item>
    </tree-breadcrumb>
    <tree-cell title="标题标题标题" value="是的是的" solid arrow required style="margin-bottom:5px;"></tree-cell>
    <div>
      <svg aria-hidden="true">
        <use xlink:href="#check"></use>
      </svg>
      <svg aria-hidden="true">
        <use xlink:href="#radio-checked"></use>
      </svg>
      <svg aria-hidden="true">
        <use xlink:href="#checkbox-checked"></use>
      </svg>
      <svg aria-hidden="true">
        <use xlink:href="#tree"></use>
      </svg>
    </div>
    <tree-radio-list v-model="radioValue" :options="radioOptions"></tree-radio-list>
  </div>
</template>

<script>
import TreeSearch from './search';
import TreeBreadcrumb from './breadcrumb';
import TreeBreadcrumbItem from './breadcrumb-item';
import TreeCell from './cell';
import TreeRadioList from './radio-list';
export default {
  name: 'tree-tree',
  components: {
    [TreeSearch.name]: TreeSearch,
    [TreeBreadcrumb.name]: TreeBreadcrumb,
    [TreeBreadcrumbItem.name]: TreeBreadcrumbItem,
    [TreeCell.name]: TreeCell,
    [TreeRadioList.name]: TreeRadioList
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
      ],
      radioValue: 1,
      radioOptions: [
        {
          value: 0,
          text: '交通银行(尾号3089)',
          brief: '选项摘要描述',
        },
        {
          value: 1,
          text: '招商银行(尾号2342)',
          brief: '选项摘要描述',
        },
        {
          value: 2,
          text: '建设银行(尾号4321)',
          brief: '选项摘要描述',
          disabled: true,
        }
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
  svg{
    vertical-align: bottom;
    width: 18px;
    height: 18px;
  }
</style>