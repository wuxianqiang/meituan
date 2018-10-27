<template>
  <div class="page">
    <header class="header">
      <h1 class="title">{{ title }}</h1>
      <!-- <img
        class="back"
        :src="backIcon"
        @click="back"
        alt="back"
      /> -->
      <search></search>
    </header>
    <div class="wrapper">
      <section v-show="desc" class="desc">
        <slot name="desc">{{ desc }}</slot>
      </section>
      <main class="content">
        <slot name="content">{{ content }}</slot>
      </main>
    </div>
  </div>
</template>

<script>
import search from '../search/search'
export default {
  components: {
    search
  },
  props: {
    title: {
      type: String,
      default: '',
      required: true
    },
    desc: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      backIcon: require('../../assets/logo.png')
    }
  },
  methods: {
    back () {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="stylus">
  @import '~assets/stylus/variable'
  .page
    position: fixed
    z-index: 20
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: #efeff4
    .header
      background $color-background-d
    .title
      font-size 17px
      font-weight 700
      line-height 44px
      text-align center
      background $color-background-d
      color $color-text-d
</style>
