<template>
  <div class="tree-radio-list">
    <tree-cell v-for="(item, index) in treeData" :key="item.id" :title="item.name" @on-label-click="$_checkedClick(item)" align="default" :class="[{'parent-not-selectable': !parentSelectable && item.isParent}]">
      <label slot="left" class="icon" for="tree-radio-next" @click.stop="$_checkedClick(item)" v-if="parentSelectable || !item.isParent">
        <svg class="tree-svg" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" v-if="currentValue === item.id">
          <path d="M512 51.2C257.5 51.2 51.2 257.5 51.2 512S257.5 972.8 512 972.8 972.8 766.5 972.8 512 766.5 51.2 512 51.2z m0 716.8c-141.4 0-256-114.6-256-256s114.6-256 256-256 256 114.6 256 256-114.6 256-256 256z" fill="#3B7BFF"></path>
        </svg>
        <svg class="tree-svg" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" v-else>
          <path d="M512 972.8C257.9 972.8 51.2 766.1 51.2 512 51.2 257.9 257.9 51.2 512 51.2c254.1 0 460.8 206.7 460.8 460.8 0 254.1-206.7 460.8-460.8 460.8z m0-870.4c-225.9 0-409.6 183.8-409.6 409.6S286.1 921.6 512 921.6 921.6 737.8 921.6 512 737.8 102.4 512 102.4z" fill="#C4C9D9"></path>
        </svg>
      </label>
      <div slot="right" id="tree-radio-next" class="tree-radio-next" @click.stop="$_nextClick(item)" v-if="(isAsync&&item.isParent) || (item.children && item.children.length)">
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
  name: 'tree-radio-list',
  components: {
    [TreeCell.name]: TreeCell
  },
  props: {
    options: {
      type: Array,
      default() {
        return []
      }
    },
    value: {},
    iconText: {
      type: String,
      default: '下级'
    },
    isAsync: {
      type: Boolean,
      default: false
    },
    parentSelectable: {
      type: Boolean,
      default: true
    },
    childrenDisabled: {
      type: Boolean,
      default: false
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
      if(!this.parentSelectable && item.isParent) return; // 父级不可选
      this.currentValue = item.id;
      this.$emit('item-checked', item);
    },
    $_nextClick(item) {
      if(this.disabledOptions) return
      if(item.children && item.children.length) {
        this.treeData = item.children;
      }
      this.$emit('next-click', item);
    },
  }
}
</script>
<style lang="css" scoped>
  .tree-radio-list {
    -webkit-overflow-scrolling:touch;
  }
  .tree-radio-list .tree-cell:not(:last-child):after {
    content: '';
    position: absolute;
    left: 51px;
    bottom: 0;
    width: calc(100% - 51px);
    height: 1px;
    background: #EDF2FB;
  }
  .tree-radio-list .tree-cell.parent-not-selectable:after {
    left: 17px;
    width: calc(100% - 17px);
  }
  .tree-cell-right {
    flex: 1 0 86px;
  }
  .tree-radio-next {
    margin-left: 17px;
  }
  .tree-radio-next:after {
    content: '';
    clear: both;
    position: absolute;
    width: 86px;
    height: 50px;
    top: -16px;
    left: 0;
  }
  .tree-radio-next:active:after{
    background: #E9EAEC;
    opacity: 0.5;
  }
  .tree-radio-next>span, .tree-radio-next>label {
    float: left;
  }
  .tree-radio-next>span {
    color: #3B7BFF;
  }
  .tree-radio-next>label {
    padding-right: 5px;
    padding-left: 17px;
    border-left: 1px solid #C4C9D9;
  }
  .tree-cell-right {
    justify-content: flex-end;
  }
  .tree-radio-next {
    position: relative;
    min-width: 72px;
  }
</style>