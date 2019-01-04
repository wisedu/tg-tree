<template>
  <div class="tg-tree">
    <!-- cell模式 -->
    <tree-cell 
      :title="title" 
      :keyName="labelName" 
      :required="required"
      :disabled="disabled"
      :align="align"
      :solid="solid"
      :arrow="arrow"
      @click="$_cellClick"
      style="margin-bottom:5px;">
    </tree-cell>
    <!-- search搜索框 -->
    <tree-search 
      v-if="hasSearch" 
      v-model="searchResult" 
      :placeholder="searchPlaceholder"  
      @on-search="$_searchHandle">
    </tree-search>
    <!-- 面包屑 -->
    <tree-breadcrumb ref="breadcrumb">
      <tree-breadcrumb-item v-for="(item,index) in breadOptions" :key="item.id" :item="item" @bread-click="$_breadClick" :data-index="index"></tree-breadcrumb-item>
    </tree-breadcrumb>
    <!-- 单选list -->
    <tree-radio-list v-model="radioValue" :options="radioOptions" @item-checked="$_itemChecked" @next-click="$_nextClick" ref="radioList"></tree-radio-list>
  </div>
</template>

<script>
import utils from './utils';
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
      solid: true, // 固定title宽度
      arrow: true, // 默认有箭头
      labelName: this.keyName, // 默认id对应name值
      searchResult: '',
      breadOptions: [
        {name: '全部',id:''}
      ],
      radioValue: this.value,
      radioOptions: [],
      sameLevel: null,  // 用来标识选项是否同属同一级
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    keyName: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    align: {
      type: String,
      default: 'right'
    },
    hasSearch: {
      type: Boolean,
      default: false
    },
    searchPlaceholder: {
      type: String,
      default: '搜索'
    },
    value: {},
    options: {
      type: Array,
      default: function(){
        return []
      }
    }
  },
  watch: {
    value: function(val) {
      this.radioValue = val;
    },
    radioValue: function(newVal) {
      this.$emit('input',newVal)
    },
    options: function(newOpts) {
      this.initial();
    },
    breadOptions: function(newBread,oldBread){
      this.updateBreadcrumbScroll()
    }
  },
  methods: {
    $_cellClick(e) {
      this.$emit('cell-click',e)
    },
    $_breadClick(item,index) {
      this.sameLevel = item.pId;
      if(index === this.breadOptions.length-1) return;
      // 同步数据,bread切换，breadOptions数据取自options.children
      var datas = index>0?this.breadOptions[index-1].children:this.breadOptions[0].children;
      this.$refs.radioList.treeData = JSON.parse(JSON.stringify(datas));
      this.breadOptions.splice(index+1);
      this.radioValue = null
    },
    $_searchHandle(value,e) {
      // TODO: search方法
      // console.log(value,e)
    },
    $_itemChecked(item) {
      if(this.isSamelevelCheck(item)) return;
      this.sameLevel = item.pId;
      this.dealWithBread(item);
    },
    $_nextClick(item) {
      this.radioValue = null;
      if(this.isSamelevelCheck(item)) return;
      this.dealWithBread(item);
    },
    /**
     *  功能说明：判断当前选项是否与上一次itemChecked同属同一父级下
     *  @item: 当前选项对象
     */
    isSamelevelCheck (item) {
      if(this.sameLevel === item.pId) {
        this.breadOptions.splice(-1,1,item);
        return true;
      }
      return false;
    },
    /**
     *  功能说明：处理面包屑breadOptions数值，缓存存储页面数据，选项切换时触发
     *  @item: 当前选项对象
     */
    dealWithBread(item) {
      var ids = [];
      this.breadOptions.forEach(function(option){
        ids.push(option.id);
      });
      var idx = ids.indexOf(item.id);
      if(idx === -1) {
        this.breadOptions.push(item);
      }
    },
    /**
     *  功能说明：修正面包屑的滚轮，当面包屑宽度大于屏幕宽度时，自动右滑动
     *  @item: 当前选项对象
     */
    updateBreadcrumbScroll() {
      this.$nextTick(function(){
        var breadcrumbVM = this.$refs.breadcrumb;
        const track = this.$el.querySelector('.tree-breadcrumb-track');
        var boxWidth = window.getComputedStyle(breadcrumbVM.$el).width;
          boxWidth = Number(boxWidth.slice(0,-2));
        var trackWidth = window.getComputedStyle(track).width;
        trackWidth = Number(trackWidth.slice(0,-2));
        if(trackWidth > boxWidth) {
          var extra = trackWidth - boxWidth;
          breadcrumbVM.$el.scrollLeft = extra;
        }
      })
    },
    initial() {
      const treeJson = utils.toTreeData(this.options, '', {ukey:"id", pkey:'pId', toCKey:'children'});
      if(!treeJson.length) return;
      console.log(treeJson)
      this.breadOptions[0].children = treeJson;
      if(this.radioValue == null) {
        this.radioOptions = treeJson;
      }else{
        // MASK: 利用hash法快速获取选定项
        var hashId = [];
        this.options.forEach(function(obj){
          hashId[obj.id] = obj;
        });
        var radioObj = hashId[this.radioValue];
        // 判断给定值id是否有效
        if(radioObj){
          var parentIds = [radioObj];
          var pId = radioObj.pId;
          while(pId !== ''){
            parentIds.push(hashId[pId]);
            pId = hashId[pId].pId;
          }
          this.breadOptions = this.breadOptions.concat(parentIds.reverse());
          this.radioOptions = this.breadOptions[this.breadOptions.length-2].children;
          this.sameLevel = radioObj.pId;
        }else{
          this.radioOptions = treeJson;
        }
      }
    }
  },
  created() {
    this.initial();
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