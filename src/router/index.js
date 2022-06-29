import { createRouter, createWebHistory } from 'vue-router'
import OldEdit from "@/views/OldEdit";

const routes = [
  {
    path: '/convert',
    name: 'old',
    component: OldEdit
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
