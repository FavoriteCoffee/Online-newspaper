import {createRouter, createWebHistory} from "vue-router";
import MainPage from "../src/MainPage.vue";
import Authentication from "../src/Authentication.vue";
import Ragistration from "../src/Ragistration.vue";

export default createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/main', component: MainPage, alias: '/' },
        { path: '/authentication', component: Authentication },
        { path: '/registration', component: Ragistration }
    ]
})