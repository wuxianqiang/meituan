<template>
  <div>
    <page
      title="美团闪购"
      class="navigator-view"
    >
      <div slot="content">
        <div
          ref="viewport"
          class="navigator-container"
        >
          <navigator
            :navList="navList"
            :currentTabIndex="currentTabIndex"
            @change="change"
          >
            <span
              slot="item"
              slot-scope="props"
              :class="{'link-active':isCurrent(props.index)}"
              class="tab-name"
            >
              {{props.text}}
            </span>
          </navigator>
        </div>
        <div class="tab-render-content">
          <router-view></router-view>
        </div>
      </div>
    </page>
  </div>
</template>

<script>
import page from 'base/page/page'
import navigator from 'base/navigator/navigator'

export default {
  components: {
    page,
    navigator
  },
  /* eslint-disable  */
  data () {
    return {
      navList: [
        { id: 1, name: '推荐', text: 'recommend' },
        { id: 2, name: '超市便利', text: 'supermarket' },
        { id: 3, name: '生鲜果蔬', text: 'vegetables' },
        { id: 4, name: '医药健康', text: 'health' },
        { id: 5, name: '浪漫鲜花', text: 'flowers' },
      ],
      currentTabIndex: 1,
      title: '推荐'
    }
  },
  methods: {
    isCurrent (index) {
      return index === this.currentTabIndex
    },
    change (item) {
      if (item !== undefined) {
        this.currentTabIndex = item.id
        this.$router.replace(`/${item.text}`)
        this.title = item.name
        return
      }
      this.$router.replace(`/recommend`)
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
