import Vue from 'vue'
import Router from 'vue-router'
import Shop from 'components/shop/shop'
import Recommend from 'components/recommend/recommend'
import Supermarket from 'components/supermarket/supermarket'
import Vegetables from 'components/vegetables/vegetables'
import Health from 'components/health/health'
import Flowers from 'components/flowers/flowers'
import food from 'base/food/food'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'shop',
      component: Shop,
      children: [
        {
          path: 'recommend',
          component: Recommend
        },
        {
          path: 'supermarket',
          component: Supermarket
        },
        {
          path: 'vegetables',
          component: Vegetables
        },
        {
          path: 'health',
          component: Health
        },
        {
          path: 'flowers',
          component: Flowers
        }
      ]
    },
    {
      path: '/food',
      component: food
    }
  ]
})
