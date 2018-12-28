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
    const items = this.$el.querySelectorAll('.tree-breadcrumb-child');
    const track = this.$el.querySelector('.tree-breadcrumb-track');
    var boxWidth = window.getComputedStyle(this.$el).width;
      boxWidth = Number(boxWidth.slice(0,-2));
    var trackWidth = window.getComputedStyle(track).width;
    trackWidth = Number(trackWidth.slice(0,-2));
    if(trackWidth > boxWidth) {
      var extra = trackWidth - boxWidth;
      this.$el.scrollLeft = extra;
    }
    items.forEach(function(item,index){
      if (items.length-1 === index) {
        item.setAttribute('data-index','current');
      }else{
        item.setAttribute('data-index', index);
      }
    });

    // this.$el.addEventListener('scroll',function(e){
    //   console.log(e.target.scrollWidth)
    // })
  }
}
</script>
<style lang="css">
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
