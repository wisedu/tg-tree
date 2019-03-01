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
      @click="$_cellClick">
      <span v-if="!labelName" class="tree-placeholder">{{placeholder}}</span>
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
      <div class="tree-content" :style="[{height: (vh-105) + 'px'}]">
        <!-- 单选list -->
        <tree-radio-list 
          v-if="!multiple"
          v-model="radioValue" 
          :options="radioOptions" 
          @item-checked="$_itemChecked"
          @next-click="$_nextClick" 
          ref="radioList" 
          :is-async="isAsync" 
          :parent-selectable="parentSelectable">
        </tree-radio-list>
        <!-- 多选list -->
        <tree-checkbox-list 
          v-if="multiple"
          v-model="checkboxValue" 
          ref="checkboxList"
          :options="checkboxOptions"
          @item-click="$_itemClick"
          @next-click="$_nextClick"
          :is-async="isAsync" 
          :parent-selectable="parentSelectable">
        </tree-checkbox-list>
      </div>
      <div class="tree-button-action" v-if="!multiple">
        <tree-button type="primary" round style="width:50%;margin: 0 auto;" @btn-click="$_radioCancel">取消</tree-button>
      </div>
      <div class="tree-button-action" v-if="multiple">
        <tree-selector-footer v-model="checkboxSelectors" @change="$_checkboxSelectorChange" @confirm="$_checkboxSelectorConfirm"></tree-selector-footer>
      </div>
    </div>
  </div>
</template>

<script>
import utils from './source/utils';
import TreeSearch from './source/search';
import TreeBreadcrumb from './source/breadcrumb';
import TreeBreadcrumbItem from './source/breadcrumb-item';
import TreeCell from './source/cell';
import TreeRadioList from './source/radio-list';
import TreeCheckboxList from './source/checkbox-list';
import TreeButton from './source/button';
import TreeSelectorFooter from './source/selector-footer';


export default {
  name: 'tg-tree',
  components: {
    [TreeSearch.name]: TreeSearch,
    [TreeBreadcrumb.name]: TreeBreadcrumb,
    [TreeBreadcrumbItem.name]: TreeBreadcrumbItem,
    [TreeCell.name]: TreeCell,
    [TreeRadioList.name]: TreeRadioList,
    [TreeCheckboxList.name]: TreeCheckboxList,
    [TreeButton.name]: TreeButton,
    [TreeSelectorFooter.name]: TreeSelectorFooter
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
      radioValue: this.isView?this.value:this.keyId,
      radioOptions: [],
      checkboxValue: [],
      checkboxOptions: [],
      sameLevel: null,  // 用来标识选项是否同属同一级
      maskShow: false,  // 遮罩
      vh: document.documentElement.clientHeight, // 客户端高度
      checkboxSelectors: [], //多选选中项对象
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    keyId: [String,Number,Array], // 仅作用于isView = false模式下且为同步数据，数据回显;Array用于多选模式
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
    placeholder: {
      type: String,
      default: '请选择'
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
      required: true,
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
    },
    multiple: {
      type: Boolean,
      default: false
    },
    divider: { //多选分割符
      type: String,
      default: ',',
      validator: function(value){
        return [',','-','/','%','&','--'].indexOf(value)>-1;
     }
    }
  },
  watch: {
    value: function(val) {
      // value 值为boolean时，用作遮罩；非boolean用作选中值
      if(typeof val === 'boolean') {
        this.maskShow = val;
        if(val) this.openMaskAction();
      }else{
        if(this.multiple){  //多选
          this.checkboxValue = val;
        }else{
          this.radioValue = val;
        }
      }
    },
    radioValue: function(newVal) {
      // 注：newval == null,即非选中状态，不改变value值
      if(this.isView && newVal != null){
        this.$emit('input',newVal)
      }
    },
    maskShow: function(newState){
      if(!this.isView) {
        this.$emit('input',newState)
      }
    },
    options: function(newOpts,oldVal) {
      if(this.multiple){  //多选
        if(this.isAsync){
          this.checkboxOptions = newOpts;
        }else{
          this.multiInitial();
        }
      }else{
        if(this.isAsync){ //异步
          this.radioOptions = newOpts;
        }else{
          this.initial();
        }
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
      // 多选点击当前项，展示当前项的children;单选点击当前项，则展示当前项父级的children，即展示当前项同级数据
      if(this.multiple){
        if(index === this.breadOptions.length-1) return;
        this.breadOptions.splice(index+1);
        if(!this.isAsync){
          // 同步数据,bread切换，breadOptions数据取自options.children
          var datas = this.breadOptions[index].children;
          this.$refs.checkboxList.treeData = JSON.parse(JSON.stringify(datas));
        }else{
          this.$emit("selector-click",item.id,item);
        }
      }else{
        this.sameLevel = item.pId;
        if(index === this.breadOptions.length-1) return;
        this.breadOptions.splice(index+1);
        this.radioValue = null;
        if(!this.isAsync){
          // 同步数据,bread切换，breadOptions数据取自options.children
          var datas = index>0?this.breadOptions[index-1].children:this.breadOptions[0].children;
          this.$refs.radioList.treeData = JSON.parse(JSON.stringify(datas));
        }else{
          this.$emit("selector-click",item.pId?item.pId:'',item);
        }
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
        // 父级不可选模式(parentSelectable = false)
        if(item.isParent === 0) {
          this.closeMaskAction(item);
        }else{
          if(this.isSamelevelCheck(item)) return;
          this.sameLevel = item.pId;
          this.dealWithBread(item);
        }
      }
    },
    /**
     *  功能说明：多选模式下，点击某一单项触发
     *  @item: 当前点击项
     *  @index: 标识选中还是取消选中，-1为选中，>=0为取消选中且表示当前项在已选中值this.checkboxValue数组中的下标
     */
    $_itemClick(item,index){
      if(index === -1){
        this.checkboxSelectors.push(item);
      }else{
        this.checkboxSelectors.splice(index,1);
      }
    },
    $_nextClick(item) {
      if(this.multiple){
        if(this.breadOptions[this.breadOptions.length-1].pId === item.pId) this.breadOptions.splice(-1,1,item);
        if(this.isAsync){
          this.$emit("selector-click",item.id,item);
        }
        this.dealWithBread(item);
      }else{
        this.radioValue = null;
        if(this.isAsync){
          if(this.sameLevel === item.pId) this.breadOptions.splice(-1,1,item);
          this.$emit("selector-click",item.id,item)
        }else{
          if(this.isSamelevelCheck(item)) return;
        }
        this.dealWithBread(item);
      }  
    },
    /**
     *  功能说明：单选取消按钮
     */
    $_radioCancel(e) {
      this.maskShow = false;
      document.body.classList.remove( 'tree-overflow-hidden');
    },
    /**
     *  功能说明：多选模式下，详情清单中选择项变更变化触发时间
     *  @opts: 选中项变更后的值，即【this.checkboxSelectors】
     */
    $_checkboxSelectorChange(opts) {
      var selectors = [];
      opts.forEach(function(opt){
        selectors.push(opt.id);
      });
      this.checkboxValue = selectors;
    },
    /**
     *  功能说明：多选模式下，确认按钮触发事件
     */
    $_checkboxSelectorConfirm(){
      this.maskShow = false;
      document.body.classList.remove( 'tree-overflow-hidden');
      var arr = this.checkboxSelectors.map(function(item){
        return item.name;
      });
      arr = arr.join(this.divider);
      this.labelName = arr;
      if(this.isView) {
        this.$emit('input',this.checkboxValue);
      }
      this.$emit('selected-click', this.checkboxValue, this.labelName, this.checkboxSelectors);
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
     *  功能说明： 单选数据初始化
     */
    initial() {
      const treeJson = utils.toTreeData(this.options, '', {ukey:"id", pkey:'pId', toCKey:'children'});
      if(!treeJson.length || this.breadOptions.length>1) return;
      this.breadOptions[0].children = treeJson;
      if(this.radioValue == null || this.radioValue === '') {
        this.radioOptions = treeJson;
      }else{
        // MASK: 利用hash法快速定位选定项
        var hashId = [];
        this.options.forEach(function(obj){
          hashId[obj.id] = obj;
        });
        var radioObj = hashId[this.radioValue];
        this.labelName = radioObj.name; // 针对options不为空时，复显radioValue的KeyName
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
     *  功能说明： 多选数据初始化
     */
    multiInitial() {
      console.log('multiInitial')
      const treeJson = utils.toTreeData(this.options, '', {ukey:"id", pkey:'pId', toCKey:'children'});
      if(!treeJson.length) return;
      this.checkboxOptions = treeJson;
      this.breadOptions[0].children = treeJson;
      // 判断是否自定义显示面板
      if(this.isView){
        this.checkboxValue = this.value;
      }else{
        this.checkboxValue = this.keyId;
      }
      var that = this;
      var hashId = [];
      this.checkboxSelectors = [];
      this.options.forEach(function(opt){
        if(that.checkboxValue.indexOf(opt.id)>-1){
          hashId[opt.id] = opt
        }
      });
      this.checkboxValue.forEach(function(id){
        that.checkboxSelectors.push(hashId[id]);
      });
      console.log(this.checkboxSelectors)
    },
    /**
     *  功能说明： 打开遮罩，处理遮罩问题，初始化面包屑
     */
    openMaskAction(){
      var that = this;
      // 禁止body滚动
      document.body.classList.add( 'tree-overflow-hidden');
      // 重新计算当前客户端高度
      var clientHeight = document.documentElement.clientHeight;
      this.vh = this.vh>clientHeight?this.vh:clientHeight;
      // 异步breadcrumb初始化
      if(this.isAsync) {
        this.breadOptions = [{name: '全部',id:''}];
        if(this.multiple) {
          this.checkboxValue = this.isView?this.value:this.keyId;
          var labels = this.labelName.split(this.divider);
          this.checkboxSelectors = [];
          this.checkboxValue.forEach(function(id,index){
            that.checkboxSelectors.push({"id": id, "name": labels[index]});
          });
        }else{
          this.radioValue = this.isView?this.value:this.keyId;
          this.sameLevel = null;
        }
      }else{
          if(this.options.length){
            this.breadOptions = [{name: '全部',id:''}];
            if(this.multiple){
              this.multiInitial();
            }else{
              this.radioValue = this.isView?this.value:this.keyId;
              this.initial();
            }
          }
      }
    },
    /**
     *  功能说明： 单选--关闭遮罩选择层，去除body禁用样式，处理外抛或外部显示数据
     *   @item: 当前选中项
     */
    closeMaskAction(item){
      this.maskShow = false;
      // 解除body滚动
      document.body.classList.remove( 'tree-overflow-hidden');
      if(this.isView) this.labelName = item.name;
      this.$emit('selected-click',item);
    }
  },
  created() {
    // 单选模式，created发生时options赋值时适用
    if(!this.multiple) this.initial();
  },
  destroyed() {
    document.body.classList.remove( 'tree-overflow-hidden');
  }
};
</script>
<style lang="css">
  .tree-breadcrumb {
    margin-bottom: 5px;
  }
  .tree-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #EDF2FB;
    z-index: 999;
  }
  .tree-overflow-hidden {
    overflow: hidden !important;
  }
  .tree-content {
    overflow-y: auto;
    -webkit-overflow-scrolling: touch; 
  }
  .tree-placeholder {
    color: #C4C9D9;
  }
  .tree-svg{
    vertical-align: bottom;
    width: 21px;
    height: 21px;
  }
  .tree-svg-color-primary {
    fill: #3B7BFF; 
  }
  .tree-svg-color-default {
    fill: #C4C9D9;
  }
  .tree-color-primary {
    color: #3B7BFF;
  }
  .tree-color-disabled {
    color: #C4C9D9;
  }
  .tree-button-action {
    height: 50px;
    background-color: #fff; 
    padding: 7px 0;
  }
</style>