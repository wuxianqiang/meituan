<template>
  <div>
    推荐
    <div @click="handleshow">
      hh
    </div>
    <detail ref="detail"></detail>
  </div>
</template>

<script>
import {getRecommend} from '@/api/shop'
import detail from 'base/star/star'

export default {
  components: {
    detail
  },
  data () {
    return {}
  },
  created () {
    getRecommend().then((data) => {
      console.log(data.data)
    })
  },
  methods: {
    handleshow () {
      this.$refs.detail.show()
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
