// File: `src/router.ts`
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import AddForm from '@/pages/AddForm.vue'
import login  from '@/pages/login.vue' // créer/mettre à jour si nécessaire

const routes = [
  { path: '/', component: Home, meta: { requiresAuth: true } },
  { path: '/add', component: AddForm, meta: { requiresAuth: true } },
  { path: '/login', component: login },
]

export const router = createRouter({ history: createWebHistory(), routes })
