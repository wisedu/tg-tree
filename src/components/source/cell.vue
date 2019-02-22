<template>
  <div
      class="tree-cell"
      :class="[
        required ? 'required' : '',
        disabled ? 'disabled' : '',
        solid ? 'solid' : ''
      ]"
      @click="$_onItemClick($event)">
      <div class="tree-cell-inner">
        <!-- Left Control -->
        <div class="tree-cell-left" v-if="$slots.left">
          <slot name="left"></slot>
        </div>
        <!-- Title Control -->
        <div class="tree-cell-label" @click.stop="$emit('on-label-click')">
          <slot name="title">
            <div class="tree-cell-title" v-html="title"></div>
            <div class="tree-cell-brief" v-if="brief" v-html="brief"></div>
          </slot>
        </div>
        <!-- Content -->
        <div
          class="tree-cell-content"
          :class="[align]">
          <slot>{{keyName}}</slot>
        </div>
        <!-- Right Control -->
        <div
          class="tree-cell-right"
          v-if="$slots.right">
          <slot name="right"></slot>
        </div>
        <!-- Arrow Icon -->
        <i v-if="arrow" class="tree-cell-arrow-right">
          <svg class="tree-svg tree-svg-color-default" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path d="M568.00288375 512.01152332L384.41482981 333.95461835c-13.22866482-12.81382867-13.55131526-33.97047364-0.73748659-47.199138 0.23046473-0.23046473 0.50702186-0.460929 0.7374866-0.73748659 13.78177954-13.36694338 35.67591109-13.36694338 49.41159775 0l203.91502614 197.73857677c15.57940315 15.11847414 15.9942393 40.00864444 0.87576561 55.58804714l-0.82967276 0.82967274-203.91502613 197.73857631c-13.78177954 13.36694338-35.67591109 13.36694338-49.41159776 0-13.22866482-12.81382867-13.55131526-33.97047364-0.7374866-47.199138l0.7374866-0.73748659L568.00288375 512.01152332z"></path>
          </svg>
        </i>
      </div>
    </div>
</template>

<script>
export default {
  name: 'tree-cell',
  props: {
    title: {
      type: String,
      default: '',
    },
    brief: {
      type: String,
      default: '',
    },
    keyName: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    arrow: {
      type: Boolean,
      default: false,
    },
    align: {
      // left, right, center
      type: String,
      default: 'left',
      validator(value) {
        return ['left', 'right', 'center', 'default'].indexOf(value) > -1
      },
    },
    solid: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // MARK: events handler
    $_onItemClick(event) {
      if (this.disabled) return;
      this.$emit('click', event)
    }
  }
}
</script>
<style lang="css" scoped>
  .tree-cell {
    position: relative;
    color: #43454F;
    font-size: 14px;
    background: #FFFFFF;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }
  .tree-cell-inner {
    display: flex;
    align-items: center;
    min-height: 50px;
    padding: 8px 17px;
    box-sizing: border-box;
  }
  .tree-cell-left {
    display: flex;
    margin-right: 16px;
  }
  .tree-cell-title {
    word-break: break-all;
  }
  .tree-cell-brief {
    font-size: 12px;
    color: #C4C9D9;
  }
  .tree-cell-content {
    display: flex;
    flex-grow: 1;
  }
  .tree-cell-content.left {
    margin-left: 19px;
  }
  .tree-cell-content.center {
    justify-content: center;
  }
  .tree-cell-content.right {
    flex-direction: row-reverse;
  }
  .tree-cell-right {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .tree-cell-arrow-right {
    margin-right: -5px;
  }
  .tree-cell.required:before {
    position: absolute;
    top: 50%;
    left: 6px;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    z-index: 10;
    content: "*";
    font-family: SimSun;
    font-size: 14px;
    color: #EE3F15;
  }
  .tree-cell.solid .tree-cell-label {
    flex-basis: 84px;
    flex-shrink: 0;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .tree-cell.disabled ,.tree-cell.required.disabled:before{
    color: #C4C9D9;
  }
</style>