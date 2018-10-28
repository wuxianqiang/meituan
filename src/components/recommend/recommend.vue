<template>
  <div>
    <!-- <div class="container">
      <base-scroll :data="navList" :scrollX="true" ref="scroll">
        <ul class="list" ref="wrapper">
          <li v-for="nav in navList" :key="nav.id" class="item">{{nav.name}}</li>
        </ul>
      </base-scroll>
    </div> -->
    <base-navigator :navList="navList" @changeSlect="changeSlect" ref="navigator" :currentTabIndex="1">
      <div
        slot="item"
        slot-scope="props"
        class="navs"
        :class="{active: props.index === selectIndex}"
      >
        {{ props.text }}
      </div>
    </base-navigator>
    <div @click="handleClick">
      改变
    </div>
  </div>
</template>

<script>
import navigator from 'base/navigator/navigator'
import BaseScroll from 'base/BaseScroll/BaseScroll'
import BaseNavigator from 'base/BaseNavigator/BaseNavigator'

export default {
  components: {
    navigator,
    BaseScroll,
    BaseNavigator
  },
  data () {
    return {
      navList: [
        {id: 0, name: '1楼'},
        {id: 1, name: '2楼'},
        {id: 2, name: '3楼'},
        {id: 3, name: '4楼'},
        {id: 4, name: '梵蒂冈的的滚动个'},
        {id: 5, name: '6楼'},
        {id: 6, name: '7楼'},
        {id: 7, name: '8楼'},
        {id: 8, name: '9楼'},
        {id: 9, name: '10楼'},
        {id: 10, name: '十多个电饭锅大概范德萨'}
      ],
      selectIndex: 1
    }
  },
  mounted () {
    this.count = 10
  },
  methods: {
    handleClick () {
      this.navList = [
        {id: 11, name: '11楼'},
        {id: 12, name: '12楼'},
        {id: 13, name: '13楼'},
        {id: 14, name: '14楼'},
        {id: 15, name: '15楼'},
        {id: 16, name: '16楼'},
      ]
    },
    changeSlect (item) {
      this.selectIndex = item.id
    }
  }
}
</script>

<style lang="stylus" scoped>
.navs
  font-size 15px
  display inline-block;
  // width 50px
  padding 20px
  height 40px
  line-height 40px
  text-align center
  border-bottom 1px solid #FFF
.active
  // transition 0.3s cubic-bezier(.645,.045,.355,1)
  color red
  // border-bottom 1px solid #000
</style>
