import { createRouter, createWebHistory } from 'vue-router'
import MainPage from "@/MainPage.vue";
import GeneralMainPage from "@/GeneralMainPage.vue";
import Authentication from "@/Authentication.vue";
import Registration from "@/Registration.vue";


export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/main', component: MainPage},
    { path: '/authentication', component: Authentication},
    { path: '/registration', component: Registration},
    { path: '/generalmain', component: GeneralMainPage, alias: '/'},
  ]
})