<template>
  <div class="base-star">
    <span
      v-for="(itemClass, index) in itemClasses"
      :class="itemClass"
      :key="index"
      class="base-star__item"
    ></span>
  </div>
</template>

<script>
const LENGTH = 5
const CLS_ON = 'base-star__on'
const CLS_HALF = 'base-star__half'
const CLS_OFF = 'base-star__off'

export default {
  props: {
    score: {
      type: Number,
      default: 2.3
    }
  },
  computed: {
    itemClasses () {
      const result = []
      const score = Math.floor(this.score * 2) / 2 // 向下取0.5的倍数
      const hasDecimal = score % 1 !== 0
      const integer = Math.floor(score)
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON)
      }
      if (hasDecimal) {
        result.push(CLS_HALF)
      }
      while (result.length < LENGTH) {
        result.push(CLS_OFF)
      }
      console.log(result)
      return result
    }
  }
}
</script>

<style lang="stylus" scoped>
.base-star
  &__on
    background url('star_on.png')
  &__half
    background url('star_half.png')
  &__off
    background url('star_off.png')
  &__item
    display inline-block
    width 20px
    height 20px
</style>
