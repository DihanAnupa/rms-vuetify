import Vue from 'vue'
import VueRouter from 'vue-router'
import Items from '../views/Items.vue'
import Billing from '../views/Billing.vue'
import CRM from '../views/CRM.vue'
import DineIn from '../views/DineIn.vue'
import Events from '../views/Events.vue'
import FeedBack from '../views/FeedBack.vue'
import Orders from '../views/Orders.vue'
import Statistics from '../views/Statistics.vue'
import Inventory from '../views/Inventory.vue'
import Employee from '../views/Employee.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/Billing',
    name: 'Billing',
    component: Billing
  },
  {
    path: '/CRM',
    name: 'CRM',
    component: CRM
  },
  {
    path: '/Employee',
    name: 'Employee',
    component: Employee
  },
  {
    path: '/DineIn',
    name: 'DineIn',
    component: DineIn
  },
  {
    path: '/Events',
    name: 'Events',
    component: Events
  },
  {
    path: '/FeedBack',
    name: 'FeedBack',
    component: FeedBack
  },
  {
    path: '/Orders',
    name: 'Orders',
    component: Orders
  },
  {
    path: '/Statistics',
    name: 'Statistics',
    component: Statistics
  },
  {
    path: '/Items',
    name: 'Items',
    component: Items
  },
  {
    path: '/Inventory',
    name: 'Inventory',
    component: Inventory
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
