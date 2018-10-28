<template>
  <div>
    <div
      ref="navigator"
      class="base-navigator"
    >
      <base-scroll
        ref="scroll"
        :data="navList"
        :scrollX="true"
      >
        <div ref="wrapper" class="base-navigator__wrapper">
          <ul
            class="base-navigator__list"
          >
            <li
              v-for="item in navList"
              :key="item.id"
              class="base-navigator__list--item navigator-hook"
              @click="selectNav(item)"
            >
              <slot
                :text="item.name"
                :index="item.id"
                name="item"
              >
                <span>{{ item.name }}</span>
              </slot>
            </li>
          </ul>
          <div class="base-navigator__line" ref="line"></div>
        </div>
      </base-scroll>
    </div>
  </div>
</template>

<script>
import BaseScroll from 'base/BaseScroll/BaseScroll'

export default {
  components: {
    BaseScroll
  },
  props: {
    navList: {
      type: Array,
      default () {
        return [
          { id: 1, name: '首页' }
        ]
      }
    },
    currentTabIndex: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      current: null
    }
  },
  mounted () {
    this.$nextTick(() => {
      this._initTabListWidth()
      if (this.currentTabIndex !== null) {
        this.current = this.currentTabIndex
        setTimeout(() => {
          this._adjust(this.currentTabIndex)
        }, 500)
      }
    })
  },
  watch: {
    navList (value) {
      this.$nextTick(() => {
        this._initTabListWidth()
        setTimeout(() => {
          let index = value.findIndex(item => item.id === this.current)
          if (index < 0) {
            index = 0
          }
          this._adjust(value[index].id)
        }, 500)
      })
    }
  },
  methods: {
    // 选择操作
    selectNav (item) {
      this.current = item.id
      this.$emit('changeSlect', item)
      this._adjust(item.id)
    },
    // 计算滚动的宽度
    _initTabListWidth () {
      const wrapper = this.$refs.wrapper
      const items = wrapper.getElementsByClassName('navigator-hook')
      let width = 0
      for (let i = 0; i < items.length; i++) {
        width += items[i].offsetWidth
      }
      wrapper.style.width = (width + 1) + 'px'
    },
    _adjust (tabId) {
      const wrapper = this.$refs.wrapper
      const viewportWidth = this.$refs.navigator.offsetWidth
      const tabListWidth = wrapper.offsetWidth
      // 滚动的极限值
      const minTranslate = Math.min(0, viewportWidth - tabListWidth)
      const items = wrapper.getElementsByClassName('navigator-hook')
      // 滚动的中间位置
      let middleTranslate = viewportWidth / 2
      let width = 0
      // 计算点击的位置
      let currentWidth = 0
      this.navList.every((item, index) => {
        if (item.id === tabId) {
          currentWidth = items[index].offsetWidth / 2
          middleTranslate -= items[index].offsetWidth / 2
          return false
        }
        width += items[index].offsetWidth
        return true
      })
      // 计算滚动的位置
      let translate = middleTranslate - width
      translate = Math.max(minTranslate, Math.min(0, translate))
      this.$refs.scroll.scrollTo(translate, 0, 300)
      this.$refs.line.style.transform = `translate3d(${width + currentWidth - 10}px,0,0)`
    }
  }
}
</script>

<style lang="stylus" scoped>
.base-navigator
  width 100%;
  overflow hidden
  white-space nowrap
  &__wrapper
    position relative
  &__line
    position absolute
    bottom 0
    left 0
    height 1px
    width 20px
    background blue
    transition 0.3s cubic-bezier(.645,.045,.355,1)
  &__list
    font-size 0
    &--item
      display inline-block;
      text-align center
</style>
