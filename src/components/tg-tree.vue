<template>
  <div class="tg-tree">
    <!-- cell模式 -->
    <tree-cell
      v-if="isView" 
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
    <div class="tree-mask" v-show="maskShow" :style="[{height: vh + 'px'}]">
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
      <tree-radio-list 
        v-model="radioValue" 
        :options="radioOptions" 
        @item-checked="$_itemChecked" 
        @next-click="$_nextClick" 
        ref="radioList" 
        :is-async="isAsync" 
        :parent-selectable="parentSelectable"
        :style="[{height: (vh-55) + 'px'}]">
      </tree-radio-list>
    </div>
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
      radioValue: this.isView?this.value:(this.isAsync?null:this.keyId),
      radioOptions: [],
      sameLevel: null,  // 用来标识选项是否同属同一级
      maskShow: this.isView?false:this.value,  // 遮罩
      vh: document.documentElement.clientHeight, // 客户端高度
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    keyId: [String,Number], // 仅作用于isView模式下且为同步数据，数据回显
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
    },
    isAsync: {
      type: Boolean,
      default: false
    },
    parentSelectable: {
      type: Boolean,
      default: true
    },
    isView: { //是否嵌套cell使用，默认嵌套
      type: Boolean,
      default: true
    }
  },
  watch: {
    value: function(val) {
      // value 值为boolean时，用作遮罩；非boolean用作选中值
      if(typeof val === 'boolean') {
        this.maskShow = val;
        if(val){
          this.openMaskAction();
        }
      }else{
        this.radioValue = val;
      }
    },
    radioValue: function(newVal) {
      if(this.isView){
        this.$emit('input',newVal)
      }
    },
    maskShow: function(newState){
      if(!this.isView) {
        this.$emit('input',newState)
      }
    },
    options: function(newOpts) {
      if(this.isAsync){ //异步
        this.radioOptions = this.options;
      }else{
        this.initial();
      }
    },
    breadOptions: function(newBread,oldBread){
      this.updateBreadcrumbScroll()
    }
  },
  methods: {
    $_cellClick(e) {
      this.maskShow = true;
      this.openMaskAction();
      this.$emit('cell-click',e)
    },
    $_breadClick(item,index) {
      this.sameLevel = item.pId;
      if(index === this.breadOptions.length-1) return;
      this.breadOptions.splice(index+1);
      this.radioValue = null
      console.log(item,index,this.breadOptions)
      if(!this.isAsync){
        // 同步数据,bread切换，breadOptions数据取自options.children
        var datas = index>0?this.breadOptions[index-1].children:this.breadOptions[0].children;
        this.$refs.radioList.treeData = JSON.parse(JSON.stringify(datas));
      }else{
        this.$emit("selector-click",item.pId?item.pId:'',item);
      }
    },
    $_searchHandle(value,e) {
      // TODO: search方法
      // console.log(value,e)
    },
    $_itemChecked(item) {
      // 父级可选模式(parentSelectable = true)
      if(this.parentSelectable) {
        this.isSamelevelCheck(item);
        this.sameLevel = item.pId;
        this.dealWithBread(item);
        this.closeMaskAction(item);
      }else{
        if(this.isSamelevelCheck(item)) return;
        this.sameLevel = item.pId;
        this.dealWithBread(item);
        // 父级不可选模式(parentSelectable = false)
        if(item.isParent === 0) {
          this.closeMaskAction(item);
        }
      }
    },
    $_nextClick(item) {  
      this.radioValue = null;
      if(this.isAsync){
        if(this.sameLevel === item.pId) this.breadOptions.splice(-1,1,item);
        this.$emit("selector-click",item.id,item)
      }else{
        if(this.isSamelevelCheck(item)) return;
      }
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
    /**
     *  功能说明： 同步options数据初始化
     */
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
    },
    /**
     *  功能说明： 打开遮罩，处理遮罩问题，初始化面包屑
     */
    openMaskAction(){
      // 禁止body滚动
      document.body.classList.add( 'tree-overflow-hidden');
      // 重新计算当前客户端高度
      var clientHeight = document.documentElement.clientHeight;
      this.vh = this.vh>clientHeight?this.vh:clientHeight;
      // 异步breadcrumb初始化
      if(this.isAsync) {
        this.breadOptions = [{name: '全部',id:''}];
        this.sameLevel = null;
      }
    },
    /**
     *  功能说明： 关闭遮罩选择层，去除body禁用样式，处理外抛或外部显示数据
     *   @item: 当前选中项
     */
    closeMaskAction(item){
      this.maskShow = false;
      // 解除body滚动
      document.body.classList.remove( 'tree-overflow-hidden');
      if(this.isView) this.labelName = item.name;
      // 当isView = false,即非嵌套cell模式时，往外跑出选中值
      if(!this.isView){
        this.$emit('selected-click',item);
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
  .tree-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #EDF2FB;
  }
  .tree-overflow-hidden {
    overflow: hidden !important;
  }
  .tree-radio-list {
    overflow-y: auto;
  }
</style>