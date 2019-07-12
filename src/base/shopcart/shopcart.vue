<template>
  <div class="base-shopcart">
    <div class="base-shopcart__content" @click="toggleList">
      <div class="base-shopcart__content--left">
        <div class="base-shopcart__logo">
          <div class="base-shopcart__logo--icon">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-caigou-xianxing"></use>
            </svg>
          </div>
        </div>
        <div class="base-shopcart__price">
          ￥{{ totalPrice }}
        </div>
      </div>
      <div class="base-shopcart__content--right">
        ￥20起送
      </div>
    </div>
    <!-- 购物车小球 -->
    <div class="base-shopcart__container">
      <div
        v-for="(ball, index) in balls"
        :key="index"
      >
        <transition
          name="drop"
          @enter="dropping"
          @after-enter="afterDrop"
          @before-enter="beforeDrop"
        >
          <div
            v-if="ball.show"
            class="base-shopcart__container--ball"
          >
            <div class="base-shopcart__container--inner inner-hook">
            </div>
          </div>
        </transition>
      </div>
    </div>
    <!-- 购物车小球 -->

    <transition name="fade">
      <div class="base-shopcart__list" v-if="fold">
        <div class="base-shopcart__list--header">
          <h1 class="base-shopcart__cart">购物车</h1>
          <span class="base-shopcart__clear">清空</span>
        </div>
        <div class="base-shopcart__list--contenet">
          <ul class="base-shopcart__food">
            <li class="base-shopcart__food--item">
              <span>商品名称</span>
              <span>商品价格</span>
              <span>添加商品</span>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    selectFoods: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropBall: [],
      fold: false,
      totalCount: 5
    }
  },
  computed: {
    totalPrice () {
      let total = 0
      this.selectFoods.forEach(item => {
        total += item.price
      })
      return total
    }
  },
  methods: {
    // 接受点击时候的一个DOM对象
    // 选择一个小球让其触发缓动函数
    drop (el) {
      for (let i = 0; i < this.balls.length; i++) {
        const ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = el
          this.dropBall.push(ball)
          return
        }
      }
    },
    beforeDrop (el) {
      // 小球可能被循环点击，要遍历所有下落的小球
      let count = this.balls.length
      while (count--) {
        let ball = this.balls[count]
        if (ball.show) {
          // 获取元素相对视口的位置
          let react = ball.el.getBoundingClientRect()
          let x = react.left - 32
          let y = -(window.innerHeight - react.top - 22)
          el.style.display = ''
          el.style.transform = `translate3d(0,${y}px,0)`
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.transform = `translate3d(${x}px,0,0)`
        }
      }
    },

    dropping (el) {
      /* eslint-disable */
      // 触发页面的重绘
      let rf = el.offsetHeight
      this.$nextTick(() => {
        el.style.transform = `translate3d(0,0,0)`
        let inner = el.getElementsByClassName('inner-hook')[0]
        inner.style.transform = `translate3d(0,0,0)`
      })
    },

    afterDrop (el) {
      let ball = this.dropBall.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    },
    toggleList () {
      this.fold = !this.fold
    }
  }
}
</script>

<style lang="stylus" scoped>
.base-shopcart
  position fixed
  bottom 0
  left 0
  width 100%
  height 48px
  &__content
    display flex
    background #141d27
    &--left
      flex 1
    &--right
      width 109px
      font-weight 900
      color #fff
      text-align center
      line-height 48px
      background rgba(61,61,63,.9)
  &__logo
    display inline-block
    position relative
    top -10px
    margin 0 12px
    padding 6px
    width 56px
    height 56px
    border-radius 50%
    box-sizing border-box
    background #141d27
    &--icon
      width 100%
      height 100%
      border-radius 50%
      background rgba(61,61,63,.9)
      text-align center
      padding-top 10px
      box-sizing border-box
  &__price
    display inline-block
    vertical-align top
    padding-right 12px
    line-height 24px
    margin-top 12px
    font-size 16px
    font-weight 900
    color #999
  .icon
    width 29px
    height 29px
  &__container
    &--ball
      position fixed
      left 32px
      bottom 32px
      z-index 200
      // y方向是缓动
      transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
    &--inner
      width 16px
      height 16px
      background rgb(0,160,220)
      border-radius 50%
      // x方向是匀速
      transition all 0.4s linear
  &__list
    position absolute
    left 0
    top 0
    z-index -1
    width 100%
    transform translate3d(0, -100%, 0)
    transition all 0.3s
    &--header
      height 40px
      line-height 40px
      padding 0 18px
      background #f3f5f7
  .fade-enter,.fade-leave-to
    transform translate3d(0, 0, 0)
</style>
