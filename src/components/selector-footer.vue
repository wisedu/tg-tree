<template>
  <div class="tree-selector-footer">
    <div class="tree-selector-footer-detail" :class="[count?'tree-color-primary':'tree-color-disabled']"  @click="$_checkDetail">
      <label >查看已选(<span>{{count}}</span>)</label>
      <svg class="tree-svg" :class="[count?'tree-svg-color-primary':'tree-svg-color-default']" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <path d="M568.00288375 512.01152332L384.41482981 333.95461835c-13.22866482-12.81382867-13.55131526-33.97047364-0.73748659-47.199138 0.23046473-0.23046473 0.50702186-0.460929 0.7374866-0.73748659 13.78177954-13.36694338 35.67591109-13.36694338 49.41159775 0l203.91502614 197.73857677c15.57940315 15.11847414 15.9942393 40.00864444 0.87576561 55.58804714l-0.82967276 0.82967274-203.91502613 197.73857631c-13.78177954 13.36694338-35.67591109 13.36694338-49.41159776 0-13.22866482-12.81382867-13.55131526-33.97047364-0.7374866-47.199138l0.7374866-0.73748659L568.00288375 512.01152332z"></path>
      </svg>
    </div>
    <div class="tree-selecter-footer-comfirm">
      <tree-button type="primary" round @btn-click="$_confirm" :disabled="false">确定</tree-button>
    </div>
    <tree-popup v-model="popupVisible" :style="{ width: '100%'}" position="bottom">
      <div class="tree-popup-content">
        <div class="tree-popup-toolbar">
          <div class="tree-toolbar-left" @click="$_toolbarCancel">{{cancel}}</div>
          <div class="tree-toolbar-title">{{title}}</div>
          <div class="tree-toolbar-right" @click="$_toolbarConfirm">{{confirm}}</div>
        </div>
        <div class="tree-popup-content-list">
          <tree-cell 
            v-for="(item, index) in currentValue" 
            :key="item.id" 
            :title="item.name" 
            @on-label-click="$_selectedToggle(item,index)" 
            :disabled="disabledOptions.indexOf(item.id)>-1">
            <label slot="left" @click.stop="$_selectedToggle(item,index)">
              <svg class="tree-svg" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" v-if="!item.unchecked">
                <path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" :fill="disabledOptions.indexOf(item.id)>-1?'#C4C9D9':'#3B7BFF'"></path><path d="M512.8 645.7l184.9-320.2c7.7-13.7 25-18.6 38.7-11 13.7 7.7 18.6 25 11 38.7-0.1 0.2-0.3 0.5-0.4 0.7L547.8 698.8c-7.9 13.6-25.3 18.3-38.9 10.4l-221.7-128c-13.6-7.9-18.3-25.2-10.4-38.9 7.9-13.6 25.2-18.3 38.9-10.4l197.1 113.8z" fill="#FFFFFF"></path>
              </svg>
              <svg class="tree-svg" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" v-else>
                <path d="M512 972.8C257.9 972.8 51.2 766.1 51.2 512 51.2 257.9 257.9 51.2 512 51.2c254.1 0 460.8 206.7 460.8 460.8 0 254.1-206.7 460.8-460.8 460.8z m0-870.4c-225.9 0-409.6 183.8-409.6 409.6S286.1 921.6 512 921.6 921.6 737.8 921.6 512 737.8 102.4 512 102.4z" fill="#C4C9D9"></path>
              </svg>
            </label>
          </tree-cell>
        </div>
      </div>
    </tree-popup>
  </div>
</template>

<script>
import TreeButton from './button';
import TreeCell from './cell';
import TreePopup from './popup'
export default {
  name: 'tree-selector-footer',
  components: {
    [TreeButton.name]: TreeButton,
    [TreeCell.name]: TreeCell,
    [TreePopup.name]: TreePopup
  },
  data(){
    return {
      currentValue: [],
      count: this.value.length,
      popupVisible: false,
      cancel: "取消",
      confirm: "确定",
      title: '已选'
    }
  },
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    },
    disabledOptions: {
      type: Array,
      default() {
        return []
      }
    }
  },
  watch: {
    value: function(val){
      this.count = val.length;
    }
  },
  methods: {
    $_checkDetail: function(){
      if(!this.count) return;
      this.popupVisible = true;
      this.currentValue = JSON.parse(JSON.stringify(this.value));
    },
    $_confirm: function(){
      this.$emit('confirm',this.currentValue);
    },
    $_toolbarCancel: function(){
      this.popupVisible = false;
    },
    $_toolbarConfirm: function(){
      let result = JSON.parse(JSON.stringify(this.currentValue));
      result = result.filter(function(item){
        return !item.unchecked
      });
      result = result.map(function(item){
        delete item.unchecked;
        return item;
      });
      this.$emit('input', result);
      this.$emit('change', result);
      this.popupVisible = false;
    },
    $_selectedToggle: function(item,index){
      if(this.disabledOptions.indexOf(item.id)>-1) return;
      this.$set(this.currentValue[index],'unchecked',!item.unchecked)
    }
  }
};
</script>
<style lang="css" scoped>
.tree-selector-footer {
  padding: 0 17px;
}
.tree-selector-footer:after {
  display: block;
  content: '';
  clear: both;
}
.tree-selector-footer-detail {
  float: left;
  display: flex;
  align-items: center;
  width: 66.67%;
  line-height: 36px;
}
.tree-selecter-footer-comfirm {
  float: left;
  width: 33.33%;
}
.tree-svg {
  width: 21px; 
  height: 21px;
  vertical-align: middle;
  overflow: hidden;
}
.tree-popup-content {
  background-color: #FFF;
}
.tree-popup-content-list {
  max-height: 300px;
  overflow-y: auto;
}
.tree-popup-content-list .tree-cell:not(:last-child):after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background: #EDF2FB;
}
.tree-popup-toolbar {
  display: flex;
  align-items: center;
  font-size: 14px;
  height: 50px;
  color: #43454F;
  border-bottom: 1px solid #EDF2FB;
}
.tree-toolbar-right {
  color: #3B7BFF;
}
.tree-toolbar-title {
  flex: 1;
  text-align: center;
  font-size: 18px;
}
.tree-toolbar-left,.tree-toolbar-right {
  flex: 0 1 20%;
  text-align: center;
}
</style>