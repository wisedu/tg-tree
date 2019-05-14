<template>
  <div class="tree-checkbox-list">
    <tree-cell 
      v-for="(item, index) in treeData" 
      :key="index" 
      :title="item.name" 
      @on-label-click="$_checkedClick(item)" 
      align="default" 
      :disabled="disabledOptions.indexOf(item.id)>-1"
      :class="[{'parent-not-selectable': !parentSelectable && item.isParent}]">
      <label slot="left" class="icon" for="tree-checkbox-next" @click.stop="$_checkedClick(item)" v-if="parentSelectable || !item.isParent">
        <svg class="tree-svg" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" v-if="currentValue.indexOf(item.id) >-1">
          <path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" :fill="disabledOptions.indexOf(item.id)>-1?'#C4C9D9':'#3B7BFF'"></path><path d="M512.8 645.7l184.9-320.2c7.7-13.7 25-18.6 38.7-11 13.7 7.7 18.6 25 11 38.7-0.1 0.2-0.3 0.5-0.4 0.7L547.8 698.8c-7.9 13.6-25.3 18.3-38.9 10.4l-221.7-128c-13.6-7.9-18.3-25.2-10.4-38.9 7.9-13.6 25.2-18.3 38.9-10.4l197.1 113.8z" fill="#FFFFFF"></path>
        </svg>
        <svg class="tree-svg" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" v-else>
          <path d="M512 972.8C257.9 972.8 51.2 766.1 51.2 512 51.2 257.9 257.9 51.2 512 51.2c254.1 0 460.8 206.7 460.8 460.8 0 254.1-206.7 460.8-460.8 460.8z m0-870.4c-225.9 0-409.6 183.8-409.6 409.6S286.1 921.6 512 921.6 921.6 737.8 921.6 512 737.8 102.4 512 102.4z" fill="#C4C9D9"></path>
        </svg>
      </label>
      <div slot="right" id="tree-checkbox-next" class="tree-checkbox-next" :class="{'disabled': currentValue.indexOf(item.id) >-1}" @click.stop="$_nextClick(item,currentValue.indexOf(item.id) >-1)" v-if="(isAsync&&item.isParent) || (item.children && item.children.length)">
        <label for="icon-text">
          <svg class="tree-svg" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path d="M992 704h-95.5V512c0-17.7-14.3-32-32-32h-319l-1.3-160h96.1c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384.2c-17.7 0-32 14.3-32 32v256c0 17.7 14.3 32 32 32h96.1v160H160.1c-17.7 0-32 14.3-32 32v192H32c-17.7 0-32 14.3-32 32v256c0 17.7 14.3 32 32 32h256.2c17.7 0 32-14.3 32-32V736c0-17.7-14.3-32-32-32h-96.1V544h640.4v160h-96c-17.7 0-32 14.3-32 32v0.1l0.5 256c0 17.6 14.3 31.9 32 31.9h255c17.7 0 32-14.3 32-32V736c0-17.7-14.3-32-32-32z" fill="#3B7BFF"></path><path d="M65.3 768h190.9v192H65.3zM416.3 64h192.1v192H416.3zM768.5 768h192.1v192H768.5z" fill="#FFFFFF"></path>
          </svg>
        </label>
        <span id="icon-text" v-html="iconText"></span>
      </div>
    </tree-cell>
  </div>
</template>

<script>
import TreeCell from './cell';
export default {
  name: 'tree-checkbox-list',
  components: {
    [TreeCell.name]: TreeCell
  },
  props: {
    value: {},
    options: {
      type: Array,
      default() {
        return []
      }
    },
    parentSelectable: {
      type: Boolean,
      default: true
    },
    isAsync: {
      type: Boolean,
      default: false
    },
    iconText: {
      type: String,
      default: '下级'
    },
    disabledOptions: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      currentValue: this.value,
      treeData: this.options
    }
  },
  watch: {
    value(val) {
      this.currentValue = val;
    },
    currentValue(val) {
      this.$emit('input', val)
    },
    options(newOpts, oldOpts) {
      this.treeData = newOpts;
    }
  },
  methods: {
    $_checkedClick(item) {
      if(!this.parentSelectable&&item.isParent) return; // 父级不可选
      if(this.disabledOptions.indexOf(item.id)>-1) return;
      var index =  this.currentValue.findIndex(function(key){
        return key === item.id;
      });
      if(index === -1){
        this.currentValue.push(item.id);
        this.$emit('item-click', item, -1);
      }else{
        this.currentValue.splice(index,1);
        this.$emit('item-click', item, index);
      }
    },
    $_nextClick(item,disabled) {
      if(disabled) return;
      if(item.children && item.children.length) {
        this.treeData = item.children;
      }
      this.$emit('next-click', item);
    },
  }
}
</script>
<style lang="css" scoped>
  .tree-checkbox-list .tree-cell:not(:last-child):after {
    content: '';
    position: absolute;
    left: 51px;
    bottom: 0;
    width: calc(100% - 51px);
    height: 1px;
    background: #EDF2FB;
  }
  .tree-checkbox-list .tree-cell.parent-not-selectable:after {
    left: 17px;
    width: calc(100% - 17px);
  }
  .tree-cell-right {
    flex: 1 0 86px;
  }
  .tree-checkbox-next {
    margin-left: 17px;
  }
  .tree-checkbox-next:after {
    content: '';
    clear: both;
    position: absolute;
    width: 86px;
    height: 50px;
    top: -16px;
    left: 0;
  }
  .tree-checkbox-next.disabled:after,.tree-checkbox-next.disabled:active:after {
    background: #F7FAFF;
    opacity: 0.6;
  }
  .tree-checkbox-next:active:after{
    background: #E9EAEC;
    opacity: 0.5;
  }
  .tree-checkbox-next>span, .tree-checkbox-next>label {
    float: left;
  }
  .tree-checkbox-next>span {
    color: #3B7BFF;
  }
  .tree-checkbox-next>label {
    padding-right: 5px;
    padding-left: 17px;
    border-left: 1px solid #C4C9D9;
  }
  .tree-cell-right {
    justify-content: flex-end;
  }
  .tree-checkbox-next {
    position: relative;
    min-width: 72px;
  }
</style>