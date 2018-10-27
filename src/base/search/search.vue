<template>
  <div class="search-box">
    <!-- <i class="icon-search"></i> -->
    <input type="text" ref="input" :placeholder="placeholder" v-model="query" class="box">
    <!-- <i class="icon-dismiss" v-show="query" @click="clear"></i> -->
  </div>
</template>

<script>
import {debounce} from 'assets/js/util'
export default {
  data () {
    return {
      query: ''
    }
  },
  props: {
    placeholder: {
      type: String,
      default: '30分钟到货的生活卖场'
    }
  },
  methods: {
    clear () {
      this.query = ''
    },
    setQuery (query) {
      this.query = query
    },
    blur () {
      this.$refs.input.blur()
    }
  },
  created () {
    this.$watch('query', debounce((newQuery) => {
      this.$emit('query', newQuery)
    }, 200))
  }
}
</script>

<style lang="stylus" scoped>
  @import "~assets/stylus/variable"
  .search-box
    display: flex
    align-items: center
    margin: 0 16px
    height: 40px
    background: $color-background
    border-radius 4px;
    .icon-search
      font-size: 24px
    .box
      flex: 1
      margin: 0 5px
      line-height: 18px
      outline none
      background: $color-background
      // &::placeholder
    .icon-dismiss
      font-size: 16px
</style>
