<template>
  <transition name="slide">
    <div class="base-notice" v-show="isOpen">
      <div class="base-notice__wrapper clearfix">
        <div class="base-notice__main">
          <span>hello world</span>
          <div class="base-notice__title">
            <div class="base-notice__title--line"></div>
            <div class="base-notice__title--text">推荐</div>
            <div class="base-notice__title--line"></div>
          </div>
        </div>
      </div>
      <div class="base-notice__close" @click="hide">
        x
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      isOpen: false
    }
  },
  methods: {
    show () {
      this.isOpen = true
    },
    hide () {
      this.isOpen = false
    }
  }
}
</script>

<style lang="stylus" scoped>
.base-notice
  position fixed
  top 0
  left 0
  z-index 88
  width 100%
  height 100%
  overflow auto
  background rgba(7, 17, 27, 0.8)
  &__wrapper
    width 100%
    min-height 100%
  &__main
    margin-top 64px
    padding-bottom 64px
    color #fff
    text-align center
  &__close
    position relative
    width 32px
    height 32px
    line-height 32px
    text-align center
    color #fff
    margin -64px auto 0 auto
    clear both
  &__title
    display flex
    width 80%
    margin 20px auto
    &--line
      flex 1
      position relative
      top -6px
      border-bottom 1px solid #fff
    &--text
      padding 0 10px
      

.slide-enter-active, .slide-leave-active
  opacity 1
  transition opacity 0.3s
.slide-enter, .slide-leave-to
  opacity 0
</style>
