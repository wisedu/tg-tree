<template>
  <button 
    type="button" 
    class="tree-button"
    :class="[
      type,
      inline ? 'inline' : 'block',
      round ? 'round' : '',
      plain ? 'plain' : ''
    ]" 
    @click="handleClick">
      <div class="tree-button-content">
        <slot></slot>
      </div>
  </button>
</template>

<script>
export default {
  name: 'tree-button',
  data(){
    return {
      currentValue: this.value
    }
  },
  props: {
    type: {
      type: String,
      default: 'default'
    },
    inline: {
      type: Boolean,
      default: false
    },
    plain: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick(e) {
      this.$emit('btn-click',e)
    }
  }
};
</script>
<style lang="css" scoped>
  .tree-button {
    position: relative;
    display: block;
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    border: none;
    border-radius: 4px;
    box-sizing: border-box;
    outline: none;
    -webkit-transition: all .3s;
    transition: all .3s;
    -webkit-appearance: none;
    -webkit-user-select: none;
    -webkit-tap-highlight-color: transparent;
    overflow: visible;
  }
  .tree-button.block {
    width: 100%;
  }
  .tree-button.default {
    background-color: #fff;
    color: #43454F;
  }
  .tree-button.primary {
    background-color: #3B7BFF;
    color: #fff;
  }
  .tree-button.round {
    border-radius: 36px;
  }
  .tree-button:active::before {
    opacity: 0.35;
  }
  .tree-button::before {
    content: " ";
    position: absolute;
    top: 50%;
    left: 50%;
    opacity: 0;
    width: 100%;
    height: 100%;
    border: inherit;
    border-color: #E6F0FF;
    background-color: #E6F0FF;
    border-radius: inherit;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
  }
</style>