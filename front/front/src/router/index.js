import { createRouter, createWebHistory } from 'vue-router'
import MainPage from "@/MainPage.vue";
import GeneralMainPage from "@/GeneralMainPage.vue";
import Authentication from "@/Authentication.vue";
import Registration from "@/Registration.vue";
import Admin from "@/adminComponents/Admin";
import AdminDeleteNews from "@/adminComponents/AdminDeleteNews";
import AdminDeleteUser from "@/adminComponents/AdminDeleteUser";
import AdminDeleteComment from "@/adminComponents/AdminDeleteComment";
import AdminDeleteTag from "@/adminComponents/AdminDeleteTag";
import AdminAddTag from "@/adminComponents/AdminAddTag";
import AdminAddNews from "@/adminComponents/AdminAddNews";
import Search from "@/Search.vue";


export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/main', component: MainPage},
    { path: '/authentication', component: Authentication},
    { path: '/registration', component: Registration},
    { path: '/generalmain', component: GeneralMainPage, alias: '/'},
    { path: '/admin', component: Admin},
    { path: '/admin/delete_news', component: AdminDeleteNews},
    { path: '/admin/delete_user', component: AdminDeleteUser},
    { path: '/admin/delete_comment', component: AdminDeleteComment},
    { path: '/admin/delete_tag', component: AdminDeleteTag},
    { path: '/admin/add_tag', component: AdminAddTag},
    { path: '/admin/add_news', component: AdminAddNews},
    { path: '/search', component: Search },
  ]
})
