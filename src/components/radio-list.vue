<template>
  <div class="tree-radio-list">
    <tree-cell v-for="(item, index) in options" :key="index" :title="item.text" @on-label-click="$_checkedClick(item)">
      <label slot="left" class="icon" for="tree-radio-next" @click.stop="$_checkedClick(item)">
        <svg aria-hidden="true">
          <use :xlink:href="icon"></use>
        </svg>
      </label>
      <div slot="right" id="tree-radio-next" class="tree-radio-next" @click.stop="$_nextClick(item)" v-if="true">
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
      },
    },
    value: {},
    iconText: {
      type: String,
      default: '下级'
    }
  },
  data() {
    return {
      icon: '#radio-checked',
      currentValue: this.value
    }
  },
  watch: {
    value(val) {
      this.currentValue = val;
    },
    currentValue(val) {
      this.$emit('input', val)
    },
  },
  methods: {
    $_checkedClick(item) {
      console.log('checked', item);
    },
    $_nextClick(item) {
      console.log('next', item);
    },
  },
}
</script>
<style>
  .tree-radio-list .tree-cell:not(:last-child):after {
    content: '';
    position: absolute;
    left: 51px;
    bottom: 0;
    width: 100%;
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
</style>