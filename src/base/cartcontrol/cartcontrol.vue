<template>
  <div class="cart-control">
    <div>
      <transition name="move">
        <div class="cart-control__decrease" v-show="count" @click="handeDecrease">
          <div class="cart-control__decrease--inner">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-minus-circle"></use>
            </svg>
          </div>
        </div>
      </transition>
      <div class="cart-control__count" v-show="count">
        {{ count }}
      </div>
      <div class="cart-control__add" @click="handleClick">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-plus-circle-fill"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      count: 0
    }
  },
  methods: {
    handleClick (e) {
      this.$emit('handleAllGoods', e.target)
      this.count++
    },
    drop (e) {
      console.log(e)
    },
    handeDecrease () {
      this.count--
    }
  }
}
</script>

<style lang="stylus" scoped>
.cart-control
  &__decrease
    display inline-block
    padding 6px
    transition all 0.4s
    vertical-align top
    width 24px
    height 24px
    &--inner
      display inline-block
      fill rgb(0, 160, 220)
      width 24px
      height 24px
      transition all 0.4s
  &__add
    display inline-block
    padding 6px
    fill rgb(0, 160, 220)
    width 24px
    height 24px
    vertical-align top
    transition all 0.4s
  &__count
    width 12px
    display inline-block
    padding-top 6px
    line-height 24px
  .icon
    width 24px
    height 24px
  .move-enter-active,.move-leave-active
    opacity 1
    transform translate3d(0,0,0)
    .cart-control__decrease--inner
      transform rotate(0)
  .move-enter,.move-leave-to
    opacity 0
    transform translate3d(24px,0,0)
    .cart-control__decrease--inner
      transform rotate(180deg)
</style>
