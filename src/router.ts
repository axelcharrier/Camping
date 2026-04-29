import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import AddForm from '@/pages/AddForm.vue'

const routes = [{ path: '/', component: Home }, {path: '/add', component: AddForm}]
export const router = createRouter({ history: createWebHistory(), routes })
