<template>
    <div class="tree-demo">
        <tg-tree title="单选树" v-model="value" :options="options" :keyName="keyName" @cell-click="cellClick"></tg-tree>
    </div>
</template>
<style>
 .tree-demo {
    
 }
</style>

<script type="text/javascript">
    import utils from '../components/utils'
    import TgTree from '../components/tg-tree.vue'
    import treeData from "../../mock/tree";
    export default {
        data(){
            return {
                value: '000029',
                options: [],
                keyName: '教学机构\/农学院'
            }
        },
        components: {
            TgTree
        },
        methods:{
            cellClick(){
                var that = this;
                this.options = treeData.datas;
                // utils.Get('http://172.20.7.28:8082/AppServer/camera/queryCamera',{}).then(function(res){
                //     that.options = res.data;
                //     console.log(that.options)
                // })
            }
        },
        watch:{
            // 
        },
        mounted(){
            
        }
    }
</script>
