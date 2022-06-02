<template>
  <tree-popup v-model="maskShow" :style="{ width: '100%', 'background-color': '#EDF2FB'}" position="right" get-container="body" ref="popup">
    <!-- search搜索框 -->

    <tree-search 
      v-if="hasSearch && async" 
      v-model="searchResult" 
      :placeholder="placeholder"  
      @on-search="$_searchHandle">
    </tree-search>
    <template v-if="searchResult">
      <div class="tree-search-list" :style="[{height: 'calc(100vh - ' + searchH + 'px)'}]">
        <!-- 单选搜索list -->
       
        <tree-radio-list 
          v-if="!multiple"
          v-model="radioValue"
          :options="searchList" 
          @item-checked="$_searchItemChecked">
        </tree-radio-list>
        <!-- 多选搜索list -->
        <tree-checkbox-list 
          v-if="multiple"
          v-model="checkboxValue"
          :options="searchList"
          :disabled-options="disabledOptions" 
          @item-click="$_searchItemChecked">
        </tree-checkbox-list>
        <div class="tree-search-nodata" v-if="searchResult&&!searchList.length">
          <svg class="icon" style="width: 4em; height: 4em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2119"><path d="M660.48 823.08096c-8.4224 0.8192-16.96256 1.23904-25.6 1.23904-144.21248 0-261.12-116.90752-261.12-261.12s116.90752-261.12 261.12-261.12c8.63744 0 17.1776 0.41984 25.6 1.23904V281.6h-76.8c-42.41664 0-76.8-34.38336-76.8-76.8V128H148.48v768h512v-72.91904z m51.2-10.24V896c0 28.27776-22.92224 51.2-51.2 51.2H148.48c-28.27776 0-51.2-22.92224-51.2-51.2V128c0-28.27776 22.92224-51.2 51.2-51.2h384a25.6 25.6 0 0 1 18.10176 7.49824l153.6 153.6A25.6 25.6 0 0 1 711.68 256v57.55648c106.73152 32.79616 184.32 132.16 184.32 249.64352 0 62.8864-22.23104 120.58112-59.264 165.65248l136.24576 136.2432c9.9968 9.99936 9.9968 26.20928 0 36.20608-9.9968 9.9968-26.20672 9.9968-36.20352 0l-136.2432-136.2432A260.52352 260.52352 0 0 1 711.68 812.84352zM558.08 164.20608V204.8c0 14.13888 11.46112 25.6 25.6 25.6h40.59648L558.08 164.20352z m227.3408 545.29792C822.1696 671.6928 844.8 620.09088 844.8 563.2c0-115.93472-93.98528-209.92-209.92-209.92s-209.92 93.98528-209.92 209.92 93.98528 209.92 209.92 209.92c56.89088 0 108.4928-22.6304 146.30144-59.3792a25.8688 25.8688 0 0 1 4.23936-4.23936zM225.28 418.56c-14.13888 0-25.6-11.46112-25.6-25.6s11.46112-25.6 25.6-25.6h119.04c14.13888 0 25.6 11.46112 25.6 25.6s-11.46112 25.6-25.6 25.6H225.28z m0-136.96c-14.13888 0-25.6-11.46112-25.6-25.6s11.46112-25.6 25.6-25.6h204.8c14.13888 0 25.6 11.46112 25.6 25.6s-11.46112 25.6-25.6 25.6H225.28z" fill="#C4C9D9"></path></svg>
          <div>暂无数据</div>
        </div>
      </div>
    </template>
    <template v-else>
      <!-- 面包屑 -->
      <tree-breadcrumb ref="breadcrumb">
        <tree-breadcrumb-item v-for="(item,index) in breadOptions" :key="item.id" :item="item" @bread-click="$_breadClick" :data-index="index"></tree-breadcrumb-item>
      </tree-breadcrumb>
      <div class="tree-content" :style="[{height: 'calc(100vh - ' + usedH + 'px)'}]">
        <template v-if="multiple">
          <!-- 多选list -->
          <tree-checkbox-list 
            v-model="checkboxValue" 
            ref="checkboxList"
            :options="checkboxOptions"
            @item-click="$_itemClick"
            @next-click="$_nextClick"
            :is-async="async"
            :disabled-options="disabledOptions" 
            :parent-selectable="parentSelectable">
          </tree-checkbox-list>
        </template>
        <template v-else>
          <!-- 单选list -->
          <tree-radio-list 
            v-model="radioValue" 
            :options="radioOptions" 
            @item-checked="$_itemChecked"
            @next-click="$_nextClick" 
            ref="radioList" 
            :is-async="async" 
            :parent-selectable="parentSelectable">
          </tree-radio-list>
        </template>
      </div>
    </template>
    <div class="tree-button-action" v-if="!multiple && !searchResult">
      <tree-button type="primary" round style="width:50%;margin: 0 auto;" @btn-click="$_radioCancel">取消</tree-button>
    </div>
    <div class="tree-button-action" v-if="multiple || (multiple && searchResult)">
      <tree-selector-footer v-model="checkboxSelectors" @change="$_checkboxSelectorChange" :disabled-options="disabledOptions" @confirm="$_checkboxSelectorConfirm"></tree-selector-footer>
    </div>
  </tree-popup>
</template>

<script>
import { toTreeData,treeToArr } from 'utils'
import { TreeSearch, TreeBreadcrumb, TreeBreadcrumbItem, TreeRadioList, TreeCheckboxList, TreeButton, TreeSelectorFooter, TreePopup } from './components'
import './style/style.css'


export default {
  name: 'm-tree',
  components: { TreeSearch, TreeBreadcrumb, TreeBreadcrumbItem, TreeRadioList, TreeCheckboxList, TreeButton, TreeSelectorFooter, TreePopup },
  data(){
    return {
      labelName: this.keyName, // 默认id对应name值
      searchResult: '',
      searchList: [],
      breadOptions: [
        {name: '全部',id:''}
      ],
      radioValue: this.keyId,
      radioOptions: [],
      checkboxValue: [],
      checkboxOptions: [],
      sameLevel: null,  // 用来标识选项是否同属同一级
      maskShow: false,  // 遮罩
      checkboxSelectors: [] //多选选中项对象
    }
  },
  props: {
    keyId: [String,Number,Array], // 仅作用于isView = false模式下且为同步数据，数据回显;Array用于多选模式
    keyName: {
      type: String,
      default: ''
    },
    hasSearch: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '搜索'
    },
    searchOptions: {
      type: Array,
      default: function(){
        return []
      }
    },
    value: {},
    optionIsTree:{
      type:Boolean,
      default: false
    },
    options: {
      type: Array,
      required: true,
      default: function(){
        return []
      }
    },
    disabledOptions: {
      type: Array,
      default: function() {
        return []
      }
    },
    async: {
      type: Boolean,
      default: false
    },
    parentSelectable: {
      type: Boolean,
      default: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    fullname: {
      type: Boolean,
      default: false
    },
    divider: { //多选分割符
      type: String,
      default: ',',
      validator: function(value){
        return [',','-','/','%','&','--'].indexOf(value) > -1
      }
    }
  },
  watch: {
    value: function(val) {
      this.maskShow = val;
      if(val) this.openMaskAction();
    },
    keyName: function(value) {
      this.labelName = value
    },
    radioValue: function(newVal) {
      // console.log(newVal)
    },
    maskShow: function(newState){
      this.$emit('input',newState)
    },

    options: function(newOpts,oldVal) {
      if(this.multiple){  //多选
        if(this.async){
          this.checkboxOptions = newOpts;
        }else{
          this.multiInitial();
        }
      }else{
        if(this.async){ //异步
          this.radioOptions = newOpts;
        }else{
          this.initial();
        }
      }
    },
    breadOptions: function(newBread,oldBread){
      this.updateBreadcrumbScroll()
    },
    searchOptions: function(newOpts, oldOpts) {
      this.searchList = newOpts;
    }
  },
  computed: {
    usedH() {
      return this.hasSearch && this.async ? 155 : 105;
    },
    searchH() {
      return this.multiple ? 100 : 50;
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
        if(!this.async){
          // 同步数据,bread切换，breadOptions数据取自options.children
          let datas = this.breadOptions[index].children;
          this.$refs.checkboxList.treeData = JSON.parse(JSON.stringify(datas));
        }else{
          this.$emit("selector-click",item.id,item);
        }
      }else{
        this.sameLevel = item.pId;
        if(index === this.breadOptions.length-1) return;
        this.breadOptions.splice(index+1);
        this.radioValue = null;
        if(!this.async){
          // 同步数据,bread切换，breadOptions数据取自options.children
          let datas = index>0?this.breadOptions[index-1].children:this.breadOptions[0].children;
          this.$refs.radioList.treeData = JSON.parse(JSON.stringify(datas));
        }else{
          this.$emit("selector-click",item.pId?item.pId:'',item);
        }
      }
    },
    $_searchHandle(value) {
      // TODO: search方法
      this.$emit("on-search",value);
    },
    $_searchItemChecked(item,index) {
      if(this.multiple) {
        if(index === -1){
          this.checkboxSelectors.push(item);
        }else{
          this.checkboxSelectors.splice(index,1);
        }
      }else{
        this.searchList = [];
        this.searchResult = '';
        this.closeMaskAction(item);
      }
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
          this.dealWithBread(item);
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
        if(this.async){
          this.$emit("selector-click",item.id,item);
        }
        this.dealWithBread(item);
      }else{
        this.radioValue = null;
        if(this.async){
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
    },
    /**
     *  功能说明：多选模式下，详情清单中选择项变更变化触发时间
     *  @opts: 选中项变更后的值，即【this.checkboxSelectors】
     */
    $_checkboxSelectorChange(opts) {
      let selectors = [];
      opts.forEach(function(opt){
        selectors.push(opt.id);
      });
      this.checkboxValue = selectors;
    },
    /**
     *  功能说明：多选模式下，确认按钮触发事件
     */
    $_checkboxSelectorConfirm(){
      this.searchList = []; //清空搜索
      this.searchResult = '';//清空搜索
      this.maskShow = false;
      let arr = this.checkboxSelectors.map(function(item){
        return item.name;
      });
      arr = arr.join(this.divider);
      this.labelName = arr;
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
      let ids = [];
      this.breadOptions.forEach(function(option){
        ids.push(option.id);
      });
      let idx = ids.indexOf(item.id);
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
        let breadcrumbVM = this.$refs.breadcrumb;
        const track = this.$refs.popup.$el.querySelector('.tree-breadcrumb-track');
        let boxWidth = window.getComputedStyle(breadcrumbVM.$el).width;
          boxWidth = Number(boxWidth.slice(0,-2));
        let trackWidth = window.getComputedStyle(track).width;
        trackWidth = Number(trackWidth.slice(0,-2));
        if(trackWidth > boxWidth) {
          let extra = trackWidth - boxWidth;
          breadcrumbVM.$el.scrollLeft = extra;
        }
      })
    },
    /**
     *  功能说明： 单选数据初始化
     */
    initial() {
      let treeJson = []
      let tempOptions=this.options;
      if(this.optionIsTree){
        treeJson=this.options;
        tempOptions=treeToArr(treeJson);
      } else{
        treeJson=  toTreeData(tempOptions, '', {ukey:"id", pkey:'pId', toCKey:'children'});
      }
      if(!treeJson.length || this.breadOptions.length>1) return;
      this.breadOptions[0].children = treeJson;
      if(this.radioValue == null || this.radioValue === '') {
        this.radioOptions = treeJson;
      }else{
        // MASK: 利用hash法快速定位选定项
        let hashId = [];
        tempOptions.forEach(function(obj){
          hashId[obj.id] = obj;
        });
        let radioObj = hashId[this.radioValue];
        
        // 判断给定值id是否有效
        if(radioObj){
          this.labelName = radioObj.name; // 针对options不为空时，复显radioValue的KeyName
          let parentIds = [radioObj];
          let pId = radioObj.pId;
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
      let treeJson =[]
      let tempOptions=this.options;
      if(this.optionIsTree){
        treeJson=this.options;
        tempOptions=treeToArr(treeJson);
      }else{
        treeJson= toTreeData(tempOptions, '', {ukey:"id", pkey:'pId', toCKey:'children'});
      }
       
      if(!treeJson.length) return;
      this.checkboxOptions = treeJson;
      this.breadOptions[0].children = treeJson;
      // 判断是否自定义显示面板
      this.checkboxValue = this.keyId;
      const that = this;
      let hashId = [];
      this.checkboxSelectors = [];
      tempOptions.forEach(function(opt){
        if(that.checkboxValue.indexOf(opt.id)>-1){
          hashId[opt.id] = opt
        }
      });
      this.checkboxValue.forEach(function(id){
        that.checkboxSelectors.push(hashId[id]);
      });
    },
    /**
     *  功能说明： 打开遮罩，处理遮罩问题，初始化面包屑
     */
    openMaskAction(){
      const that = this;
      // 异步breadcrumb初始化
      if(this.async) {
        this.breadOptions = [{name: '全部',id:''}];
        if(this.multiple) {
          this.checkboxValue = this.keyId;
          let labels = this.labelName.split(this.divider);
          this.checkboxSelectors = [];
          this.checkboxValue.forEach(function(id,index){
            that.checkboxSelectors.push({"id": id, "name": labels[index]});
          });
        }else{
          this.radioValue = this.keyId;
          this.sameLevel = null;
        }
      }else{
        if(this.options.length){
          this.breadOptions = [{name: '全部',id:''}];
          if(this.multiple){
            this.multiInitial();
          }else{
            this.radioValue = this.keyId;
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
      let fullname;
      console.log(item)
      if(this.fullname) {
        let breads = JSON.parse(JSON.stringify(this.breadOptions));
        breads.shift();
        fullname = breads.map(obj => {
          return obj.name
        });
        fullname = fullname.join('/');
      }
      this.labelName = fullname || item.name;
      this.$emit('selected-click',item, this.labelName);
    }
  },
  created() {
    // 单选模式，created发生时options赋值时适用
    if(!this.multiple) this.initial();
  }
};
</script>
<style lang="css">
  .tree-breadcrumb {
    margin-bottom: 5px;
  }
  .tree-overflow-hidden {
    overflow: hidden !important;
  }
  .tree-content {
    overflow-y: auto;
    -webkit-overflow-scrolling: touch; 
  }
  .tree-search-list {
    overflow: auto;
  }
  .tree-search-nodata {
    position: absolute;
    top: 20%;
    left: 50%;
    color: #C4C9D9;
    transform: translateX(-50%);
  }
  .tree-search-nodata>div{
    padding: 5px 0;
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