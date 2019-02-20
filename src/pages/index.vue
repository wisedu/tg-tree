<template>
    <div class="tree-demo">
        <tg-tree 
            title="单选树" 
            v-model="value" 
            :keyId="keyId"
            :keyName="keyName"
            :options="options" 
            :parentSelectable="true" 
            :is-view="true" 
            :is-async="false"
            @cell-click="cellClick"
            @selector-click="loadOptions" 
            @selected-click="getSelectedValue">
        </tg-tree>
        <button @click="initSingleTree">单选树</button>
    </div>
</template>
<style>
 .tree-demo {
    
 }
</style>

<script type="text/javascript">
    import utils from '../components/source/utils'
    import TgTree from '../components/tg-tree.vue'
    import treeData from "../../mock/tree";
    export default {
        data(){
            return {
                value: "000423",
                options: [],
                keyId: '',
                keyName: '行政部门\/人事处、人才工作领导小组办公室\/综合科'
            }
        },
        components: {
            TgTree
        },
        methods:{
            cellClick(){
                var that = this;
                this.options = treeData.datas;
                // utils.Post('http://localhost:8080/emap/sys/emapflow/usergroup/getUsers.do',{}).then(function(res){
                //     console.log(res)
                // },function(err){
                //     console.log(err)
                //     var arr = [{id: "TD_LSDEPT", name: "临时人员", type: "group"},
                //                 {id: "4", name: "酱油部2", type: "group"},
                //                 {id: "1", name: "云工厂", type: "group"},
                //                 {id: "3", name: "行政部", type: "group"},
                //                 {id: "1009", name: "王二", type: "user"}]
                //     that.options = that.dataTranslation(arr);
                // })
            },
            loadOptions(id) {
                var that = this;
                utils.Post('http://localhost:8080/emap/sys/emapflow/usergroup/getUsers.do',{'searchKey':id}).then(function(res){
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
                    }else{
                        arr = [{id: "01548998", superId: "TD_LSDEPT", name: "导入姓名2", type: "user"},
                                {id: "01548997", superId: "TD_LSDEPT", name: "导入姓名3", type: "user"},
                                {id: "user1", superId: "TD_LSDEPT", name: "导入姓名4", type: "user"},
                                {id: "01548995", superId: "TD_LSDEPT", name: "导入姓名4", type: "user"},
                                {id: "01548999", superId: "TD_LSDEPT", name: "导入姓名1", type: "user"}]
                    }
                    that.options = that.dataTranslation(arr);
                    // that.options = that.options.concat(arr);
                    // [{id:"111",name:'aaa',isParent:1,pId: "001"}]
                })
            },
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
            },
            initSingleTree(){
                this.value = true;
                var that = this;
                // this.options = treeData.datas;
                utils.Post('http://localhost:8080/emap/sys/emapflow/usergroup/getUsers.do',{}).then(function(res){
                    console.log(res)
                },function(err){
                    console.log(err)
                    var arr = [{id: "TD_LSDEPT", name: "临时人员", type: "group"},
                                {id: "4", name: "酱油部2", type: "group"},
                                {id: "1", name: "云工厂", type: "group"},
                                {id: "3", name: "行政部", type: "group"},
                                {id: "1009", name: "王二", type: "user"}]
                    that.options = that.dataTranslation(arr);
                });
            },
            // isView 模式下，获取选中值
            getSelectedValue(item){
                console.log(item);
            }
        },
        watch:{
            //
        },
        mounted(){
            
        }
    }
</script>
