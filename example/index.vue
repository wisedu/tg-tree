<template>
  <div class="tree-demo">
    <p>单选树</p>
    <tg-tree 
      title="标题" 
      v-model="demoValue"
      :options="demoData"
      :parentSelectable="true"
      style="margin-bottom:5px;">
    </tg-tree>
  <!-- 同步单选树 -->
    <tg-tree 
      title="单选树" 
      v-model="value"
      :keyName="keyName"
      hasSearch
      :options="options" 
      :parentSelectable="true" 
      :is-view="true"
      @cell-click="cellClick('single')" 
      @selected-click="getSingleSelectedValue"
      style="margin-bottom:5px;">
    </tg-tree>
    <!-- 单选树自定义展示面板 -->
    <tree-cell title="自定义单选树面板" @click="customSingleTree" align="right" arrow style="margin-bottom:5px;" solid>
      <span>{{customSingleName}}</span>
    </tree-cell>
    <tg-tree 
      v-model="customSingleValue" 
      hasSearch
      :keyId="customSingleId"
      :keyName="customSingleName"
      fullname
      :options="customSingleOptions" 
      :parentSelectable="false" 
      :is-view="false"
      @selected-click="getCustomSingleSelectedValue"
      style="margin-bottom:5px;">
    </tg-tree>
    <!-- 异步单选树 -->
    <tg-tree 
      title="异步单选树" 
      v-model="asyncSingleValue" 
      :keyName="asyncSingleName"
      :options="asyncSingleOptions"
      :searchOptions="searchOptions"
      :parentSelectable="false" 
      :is-view="true"
      :is-async="true"
      hasSearch
      fullname 
      @cell-click="cellClick('asyncSingle')"
      @selector-click="asyncSingleLoadOptions"
      @on-search="searchHandle"
      @selected-click="getAsyncSingleSelectedValue"
      style="margin-bottom:5px;">
    </tg-tree>
    <!-- 单选树自定义展示面板 -->
    <tree-cell title="自定义异步单选树面板" @click="customAsyncSingleTree" align="right" arrow style="margin-bottom:5px;" solid>
      <span>{{customAsyncSingleName}}</span>
    </tree-cell>
    <tg-tree 
      v-model="customAsyncSingleValue" 
      :keyId="customAsyncSingleId"
      :keyName="customAsyncSingleName"
      :options="customAsyncSingleOptions"
      :searchOptions="searchOptions" 
      :parentSelectable="false" 
      :is-view="false"
      :is-async="true" 
      @selector-click="customAsyncSingleLoadOptions"
      @selected-click="getCustomAsyncSingleSelectedValue"
      style="margin-bottom:5px;">
    </tg-tree>
    <p>多选树</p>
  <!-- 同步多选树 -->
    <tg-tree 
      title="多选树" 
      v-model="multiValue"
      :keyName="multiKeyName" 
      :options="multiOptions" 
      :parentSelectable="true" 
      :is-view="true" 
      multiple
      hasSearch
      @cell-click="cellClick('multi')"
      style="margin-bottom:5px;">
    </tg-tree>
    <!-- 多选树自定义展示面板 -->
    <tree-cell title="自定义多选树面板" @click="customMultiTree" align="right" arrow style="margin-bottom:5px;" solid>
      <span>{{customMultiName}}</span>
    </tree-cell>
    <tg-tree 
      v-model="customMultiValue"
      :keyId="customMultiIds"
      :keyName="customMultiName" 
      :options="customMultiOptions"
      :parentSelectable="false"
      :is-view="false"
      multiple
      @selected-click="getCustomMultiSelectedValue">
    </tg-tree>
  <!-- 异步多选树 -->
    <tg-tree 
      title="异步多选树" 
      v-model="asyncMultiValue"
      :keyName="asyncMultiKeyName" 
      :options="asyncMultiOptions"
      :searchOptions="searchOptions" 
      :parentSelectable="true" 
      :is-view="true"
      :is-async="true" 
      multiple
      hasSearch
      @on-search="searchHandle"
      @cell-click="cellClick('asyncMulti')"
      @selector-click="asyncMultiLoadOptions"
      style="margin-bottom:5px;">
    </tg-tree>
    <!-- 多选树自定义展示面板 -->
    <tree-cell title="自定义异步多选树面板" @click="customAsyncMultiTree" align="right" arrow style="margin-bottom:5px;" solid>
      <span>{{customAsyncMultiName}}</span>
    </tree-cell>
    <tg-tree 
      v-model="customAsyncMultiValue"
      :keyId="customAsyncMultiIds"
      :keyName="customAsyncMultiName" 
      :options="customAsyncMultiOptions" 
      :parentSelectable="false" 
      :is-view="false"
      :disabledOptions="disabledOptions"
      :is-async="true"
      multiple
      hasSearch
      @selector-click="customAsyncMultiLoadOptions"
      @selected-click="getCustomAsyncMultiSelectedValue"
      style="margin-bottom:5px;">
    </tg-tree>
  </div>
</template>
<style>
 .tree-demo {
  
 }
</style>

<script type="text/javascript">
  import utils from './http'
  import TgTree from '../src/index.vue'
  import TreeCell from '../src/components/cell.vue'
  import treeData from "../mock/tree"
  export default {
    data(){
      return {
        demoValue: '',
        demoData: treeData.datas,
        // 默认展示面板 -- 同步单选树参数
        value: "000423",
        /*eslint no-useless-escape: 0 */
        keyName: '行政部门\/人事处、人才工作领导小组办公室\/综合科',
        options: [],//treeData.datas,
        // 自定义展示面板 -- 同步单选树参数
        customSingleValue: false,
        customSingleId: '',//''
        customSingleName: '',//''
        customSingleOptions: [], //treeData.datas,
        // 异步单选树
        asyncSingleValue: '',//'1002'
        asyncSingleName: '',//'虚拟人2'
        asyncSingleOptions: [],
        searchOptions: [],
        // 自定义展示面板 -- 异步单选树数据
        customAsyncSingleValue: false,
        customAsyncSingleId: '1009',
        customAsyncSingleName: '王二',
        customAsyncSingleOptions: [],

        // 默认展示面板--同步多选树参数
        multiValue: [],//["6", "8", "000153"],
        multiKeyName: '',//'经济实体,附属单位,直属单位\/江浦实验农场\/生产科',
        multiOptions: [],
        // 自定义展示面板--同步多选树参数
        customMultiValue: false,
        customMultiIds: ["6", "8", "000153"], // [],
        /*eslint no-useless-escape: 0 */
        customMultiName: '经济实体,附属单位,直属单位\/江浦实验农场\/生产科',//'',
        customMultiOptions: [],//treeData.datas,
        // 异步多选树
        asyncMultiValue: ["1009","user1","1002"],
        asyncMultiKeyName: '王二,导入姓名4,虚拟人2',
        asyncMultiOptions: [],
        // 自定义展示面板--异步多选树参数
        customAsyncMultiValue: false,
        customAsyncMultiIds: ["1009","user1","1002"],
        customAsyncMultiName: '王二,导入姓名4,虚拟人2',
        customAsyncMultiOptions: [],
        disabledOptions: ["1009","user1"]
      }
    },
    components: {
      TgTree,TreeCell
    },
    methods:{
      cellClick(val){
        var that = this;
        if(val === 'single'){ //同步单选树
          this.options = treeData.datas;
        }else if(val === 'asyncSingle'){ // 异步单选树
          this.getAsyncOptions().then(function(data){
            that.asyncSingleOptions = data;
          });
        }else if(val === 'multi'){ //同步多选树
          this.multiOptions = treeData.datas;
        }else if(val === 'asyncMulti'){ //异步多选树
          this.getAsyncOptions().then(function(data){
            that.asyncMultiOptions = data;
          });
        }
      },
      /************************* Ⅰ· 同步-单选 SRART ****************************/
      // 【isView=true】【单选】【同步】模式下，获取选中值
      getSingleSelectedValue (item){
        console.log(item);
      },
      // 【isView=false】【单选】【同步】模式下，激活打开树组件 
      customSingleTree(){
        this.customSingleValue = true;
        this.customSingleOptions = treeData.datas; // [{id: "0", isParent: 0, name: "女", pId: ""},{id: "1", isParent: 0, name: "男", pId: ""}]
      },
      // 【isView=false】【单选】【同步】模式下，获取选中值 
      getCustomSingleSelectedValue(item, fullname){
        console.log(item, fullname)
        this.customSingleId = item.id;
        this.customSingleName = fullname;
      },
      /************************* Ⅰ· 同步-单选 END ****************************/

      /************************* Ⅱ· 异步-单选 END ****************************/
      searchHandle(keyword) {
        console.log(keyword)
        // this.searchOptions = [{id: "1001", superId: "01548998", name: "虚拟人1", type: "user"},
        //                 {id: "1002", superId: "01548998", name: "虚拟人2", type: "user"},
        //                 {id: "1003", superId: "01548998", name: "虚拟人3", type: "user"},
        //                 {id: "1004", superId: "01548998", name: "虚拟人4", type: "user"},
        //                 {id: "1005", superId: "01548998", name: "虚拟人5", type: "user"},
        //                 {id: "1009", name: "王二", type: "user"}]
      },
      // 【isView=true】【单选】【异步】模式下，异步加载数据
      asyncSingleLoadOptions(id){
        var that = this;
        this.getAsyncOptionsByid(id).then(function(data){
          that.asyncSingleOptions = data;
        });
      },
      // 【isView=true】【单选】【异步】模式下，获取选中值
      getAsyncSingleSelectedValue(item){
        console.log(item)
      },
      // 【isView=false】【单选】【异步】模式下，激活打开树组件
      customAsyncSingleTree(){
        this.customAsyncSingleValue = true;
        var that = this;
        this.getAsyncOptions().then(function(data){
          that.customAsyncSingleOptions = data;
        });
      },
      // 【isView=false】【单选】【异步】模式下，异步加载数据
      customAsyncSingleLoadOptions(id){
        var that = this;
        this.getAsyncOptionsByid(id).then(function(data){
          that.customAsyncSingleOptions = data;
        });
      },
      //  【isView=false】【单选】【异步】模式下，获取选中值
      getCustomAsyncSingleSelectedValue(item){
        console.log(item)
        this.customAsyncSingleId = item.id;
        this.customAsyncSingleName = item.name;
      },
      /************************* Ⅱ· 异步-单选 END ****************************/

      /************************* Ⅲ· 同步-多选 SRART ****************************/
      // 【isView=false】【多选】【同步】模式下，激活打开树组件 
      customMultiTree() {
        this.customMultiValue = true;
        this.customMultiOptions = treeData.datas;
      },
      // 【isView=false】【多选】【同步】模式下，获取选中值 
      getCustomMultiSelectedValue(ids,labels){
        this.customMultiIds = ids;
        this.customMultiName = labels;
      },
      /************************* Ⅲ· 同步-多选 END ****************************/

      /************************* Ⅳ· 异步-多选 SRART ****************************/
      // 【isView=true】【多选】【异步】模式下，异步加载数据
      asyncMultiLoadOptions(id){
        var that = this;
        this.getAsyncOptionsByid(id).then(function(data){
          that.asyncMultiOptions = data;
        });
      },
      // 【isView=false】【多选】【异步】模式下，激活打开树组件 
      customAsyncMultiTree(){
        this.customAsyncMultiValue = true;
        var that = this;
        this.getAsyncOptions().then(function(data){
          that.customAsyncMultiOptions = data;
        });
      },
      // 【isView=false】【多选】【异步】模式下，异步加载数据
      customAsyncMultiLoadOptions(id){
        var that = this;
        this.getAsyncOptionsByid(id).then(function(data){
          that.customAsyncMultiOptions = data;
        });
      },
      // 【isView=false】【多选】【异步】模式下，获取选中值 
      getCustomAsyncMultiSelectedValue(ids,labels){
        this.customAsyncMultiIds = ids;
        this.customAsyncMultiName = labels;
      },
      /************************* Ⅳ· 异步-多选 END ****************************/

      // 获取本地树首页的模拟数据
      async getAsyncOptions() {
        var that = this;
        var result = [];
        result = utils.Post('http://localhost:8090/emap/sys/emapflow/usergroup/getUsers.do',{}).then(function(res){
          console.log(res)
        },function(err){
          console.log(err)
          var arr = [{id: "TD_LSDEPT", name: "临时人员", type: "group"},
                {id: "4", name: "酱油部2", type: "group"},
                {id: "1", name: "云工厂", type: "group"},
                {id: "3", name: "行政部", type: "group"},
                {id: "1009", name: "王二", type: "user"}]
          arr = that.dataTranslation(arr);
          console.log(arr)
          return arr;
        })
        return result;
      },
      // 按照id值获取本地树的模拟数据
      async getAsyncOptionsByid(id){
        var that = this;
        var result = [];
        result = utils.Post('http://localhost:8090/emap/sys/emapflow/usergroup/getUsers.do',{'searchKey':id}).then(function(res){
          console.log(res)
        },function(err){
          console.log(err)
          var arr = [];
          if(id === ""){
            arr = [{id: "TD_LSDEPT", name: "临时人员", type: "group"},
                {id: "4", name: "酱油部2", type: "group"},
                {id: "1", name: "云工厂", type: "group"},
                {id: "3", name: "行政部", type: "group"},
                {id: "1009", name: "王二", type: "user"}]
          }else if(id === "01548998"){
            arr = [{id: "1001", superId: "01548998", name: "虚拟人1", type: "user"},
                {id: "1002", superId: "01548998", name: "虚拟人2", type: "user"},
                {id: "1003", superId: "01548998", name: "虚拟人3", type: "user"},
                {id: "1004", superId: "01548998", name: "虚拟人4", type: "user"},
                {id: "1005", superId: "01548998", name: "虚拟人5", type: "user"}]
          }else{
            arr = [{id: "01548998", superId: "TD_LSDEPT", name: "导入姓名2", type: "group"},
                {id: "01548997", superId: "TD_LSDEPT", name: "导入姓名3", type: "user"},
                {id: "user1", superId: "TD_LSDEPT", name: "导入姓名4", type: "user"},
                {id: "01548995", superId: "TD_LSDEPT", name: "导入姓名5", type: "user"},
                {id: "01548999", superId: "TD_LSDEPT", name: "导入姓名1", type: "user"}]
          }
          arr = that.dataTranslation(arr);
          return arr;
        });
        return result;
      },
      // 数据格式转换
      dataTranslation(arr) {
        var result = [];
        result = arr.map(function(obj){
          if(obj.type === "group"){
            obj.isParent = 1;
          }else{
            obj.isParent = 0;
          }
          obj.pId = obj.superId?obj.superId:'';
          return obj
        });
        return result;
      }
    },
    watch:{
      //
    },
    mounted(){
      
    }
  }
</script>
<style>
  .tree-demo>p {
    font-size: 12px;
    color: #C4C9D9;
    background: #EDF2FB;
    line-height: 15px;
    padding: 10px 0 5px 17px;
  }
</style>
