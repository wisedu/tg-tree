<template>
  <div class="tree-breadcrumb" role="breadcrumb">
    <div class="tree-breadcrumb-track">
      <slot></slot> 
    </div>
  </div>
</template>

<script>
export default {
  name: 'tree-breadcrumb',
  props: {
    //
  },
  methods: {
    //
  },
  mounted() {
    const track = this.$el.querySelector('.tree-breadcrumb-track');
    let boxWidth = window.getComputedStyle(this.$el).width;
      boxWidth = Number(boxWidth.slice(0,-2));
    let trackWidth = window.getComputedStyle(track).width;
    trackWidth = Number(trackWidth.slice(0,-2));
    if(trackWidth > boxWidth) {
      let extra = trackWidth - boxWidth;
      this.$el.scrollLeft = extra;
    }
  }
}
</script>

<style>
  .tree-breadcrumb {
    overflow: auto;
    font-size: 14px;
    line-height: 18px;
    padding: 16px 0;
    background: #FFFFFF;
    box-shadow: inset 0 -1px 0 0 #EDF2FB;
  }
  .tree-breadcrumb-track {
    white-space: nowrap;
    display: inline-flex;
  }
</style>
