import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingPage,
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/DashboardPageRed.vue'),
    },
    {
      path: '/course/:id',
      name: 'course',
      component: () => import('../views/CoursePageRed.vue'),
      props: (route) => ({ id: route.params.id }),
    },
    {
      path: '/create',
      name: 'createCourse',
      component: () => import('../views/CreateCourseRed.vue'),
    },
  ],
})

export default router
