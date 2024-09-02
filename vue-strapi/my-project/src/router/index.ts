import NewsPage from '@/views/NewsPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import SignIn from '@/views/SignIn.vue'
import NewDetail from '@/views/NewDetail.vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {path: '', component: NewsPage},
  {path: '/signin', component: SignIn},
  {path: '/register', component: RegisterPage},
  {
    path: '/item/:id', // маршрут с параметром id
    name: 'item-detail',
    component: NewDetail
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
