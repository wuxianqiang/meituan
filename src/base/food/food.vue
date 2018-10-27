<template>
  <div class="base-food">
    <div>
      <h1>凉皮先生（西直门凯德店）</h1>
      <ul>
        <li>点菜</li>
        <li>评价</li>
        <li>商家</li>
      </ul>
    </div>
    <div class="base-food__wrapper">
      <scroll class="base-food__menu" :data="menu">
        <ul class="base-food__container">
          <li
            v-for="(tag, index) in menu"
            :key="index"
            class="base-food__name"
            :class="{'base-food__name--active': index === currentIndex}"
            @click="selectMenu(index)"
          >
            <div class="base-food__name--text">
              {{ tag.name }}
            </div>
          </li>
        </ul>
      </scroll>
      <scroll
        :data="menu"
        :listenScroll="true"
        :probeType="3"
        class="base-food__list"
        @scroll="handleScroll"
        ref="scroll"
      >
        <ul ref="hookWrapper">
          <li
            v-for="(item, index) in menu"
            :key="index"
            class="base-food__hook"
          >
            <h1 class="base-food__title">{{ item.name }}</h1>
            <ul>
              <li
                v-for="(food, index) in item.foods"
                :key="index"
                class="base-food__food"
              >
                <div class="base-food__food--picture">
                  <img :src="getURL(food.image_path)" width="57" height="57" alt="picture">
                </div>
                <div class="base-food__content">
                  <h2 class="base-food__content--title">{{ food.name }}</h2>
                  <p class="base-food__content--description">{{ food.description }}</p>
                  <div class="base-food__content--price">
                    <div>￥{{ food.specfoods[0].price }}</div>
                    <div><cartcontrol @handleAllGoods="handleAllGoods" ref="cart"></cartcontrol></div>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </scroll>
    </div>
    <shopcart ref="shopcart"></shopcart>
  </div>
</template>

<script>
import { getFood } from '@/api/shop'
import Scroll from 'base/sc/sc.vue'
import Shopcart from 'base/shopcart/shopcart'
import Cartcontrol from 'base/Cartcontrol/Cartcontrol'

export default {
  components: {
    Scroll,
    Shopcart,
    Cartcontrol
  },
  data () {
    return {
      menu: [],
      listHeight: [],
      scrollY: 0
    }
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        const height1 = this.listHeight[i]
        const height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    }
  },
  created () {
    this._initPage()
  },
  mounted () {
    setTimeout(() => {
      this._calculateHeight()
    }, 2000)
  },
  methods: {
    getURL (URL) {
      let imageType = 'jpeg'
      if (URL.includes('png')) {
        imageType = 'png'
      }
      /* eslint-disable */
      return `http://fuss10.elemecdn.com/${URL[0]}/${URL.substr(1,2)}/${URL.substr(3)}.${imageType}?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/`
    },
    handleScroll (pos) {
      this.scrollY = Math.abs(Math.round(pos.y))
    },
    selectMenu (index) {
      const foodList = this.$refs.hookWrapper.getElementsByClassName('base-food__hook')
      const el = foodList[index]
      this.$refs.scroll.scrollToElement(el, 300)
    },
    handleAllGoods (e) {
      this.$nextTick(() => {
        // 体验优化,异步执行代码
        this.$refs.shopcart.drop(e)
      })
    },
    _calculateHeight () {
      const foodList = this.$refs.hookWrapper.getElementsByClassName('base-food__hook')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        const element = foodList[i]
        height += element.clientHeight
        this.listHeight.push(height)
      }
    },
    async _initPage () {
      /* eslint-disable */
      const { data } = await getFood()
      this.menu = data.menu
    }
  }
}
</script>

<style lang="stylus" scoped>
.base-food
  &__wrapper
    position absolute
    overflow hidden
    display flex
    top 90px
    bottom 50px
    width 100%
    font-size 14px
    color #656565
  &__menu
    width 80px
    background #f3f5f7
  &__list
    flex 1
    background #fff
  &__name
    display table
    height 60px
    width 56px
    padding 0 12px
    &--active
      background #fff
      font-weight 700
    &--text
      display table-cell
      width 56px
      vertical-align middle
  &__title
    padding-left 8px
    border-left 2px solid #FFD161
  &__food
    display flex
    margin 18px
    padding-bottom 18px
    &:last-child
      margin-bottom 0
    &--picture
      width 57px

  &__content
    position relative
    padding-left 8px
    flex 1
    &--title
      margin 2px 0 8px 0
      line-height 14px
      font-size 14px
      color rgb(7, 17, 27)
    &--description
      margin-bottom 8
      line-height 14px
      font-size 10px
    &--price
      line-height 20px
      height 50px
      color rgb(240, 20, 20)
      font-weight 900
      display flex
      align-items center
      justify-content: space-between;
</style>
