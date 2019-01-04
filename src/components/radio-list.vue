<template>
  <div class="tree-radio-list">

    <tree-cell v-for="(item, index) in treeData" :key="index" :title="item.name" @on-label-click="$_checkedClick(item)" align="default">
      <label slot="left" class="icon" for="tree-radio-next" @click.stop="$_checkedClick(item)">
        <svg aria-hidden="true">
          <use :xlink:href="currentValue === item.id?'#radio-checked':'#check'"></use>
        </svg>
      </label>
      <div slot="right" id="tree-radio-next" class="tree-radio-next" @click.stop="$_nextClick(item)" v-if="item.children && item.children.length">
        <label for="icon-text">
          <svg aria-hidden="true">
            <use xlink:href="#tree"></use>
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
    options(newOpts) {
      console.log(newOpts)
      this.treeData = newOpts;
    }
  },
  methods: {
    $_checkedClick(item) {
      this.currentValue = item.id;
      this.$emit('item-checked', item);
    },
    $_nextClick(item) {
      if(item.children && item.children.length) {
        this.treeData = item.children;
      }
      this.$emit('next-click', item);
    },
  }
}
</script>
<style>
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
  }
</style>