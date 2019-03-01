<template>
  <div class="tree-checkbox-list">
    <tree-cell v-for="(item, index) in treeData" :key="index" :title="item.name" @on-label-click="$_checkedClick(item)" align="default" :class="[{'parent-not-selectable': !parentSelectable && item.isParent}]">
      <label slot="left" class="icon" for="tree-checkbox-next" @click.stop="$_checkedClick(item)" v-if="parentSelectable || !item.isParent">
        <svg aria-hidden="true" class="tree-svg">
          <use :xlink:href="currentValue.indexOf(item.id) >-1 ?'#tree-checkbox-checked':'#check'"></use>
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
    }
  },
  data() {
    return {
      currentValue: this.value,
      treeData: []
    }
  },
  watch: {
    value(val) {
      this.currentValue = val;
    },
    currentValue(val) {
      this.$emit('input', val)
    },
    options(newOpts) {
      this.treeData = newOpts;
    }
  },
  methods: {
    $_checkedClick(item) {
      if(!this.parentSelectable&&item.isParent) return; // 父级不可选
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