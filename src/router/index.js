import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/book/:id',
    name: 'book',
    component: () => import('../views/BookView.vue')
  },
  {
    path: '/author/:id',
    name: 'author',
    component: () => import('../views/AuthorView.vue')
  },
  {
    path: '/library',
    name: 'library',
    component: () => import('../views/LibraryView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
