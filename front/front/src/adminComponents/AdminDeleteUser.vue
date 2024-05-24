<template>
    <!-- <v-btn v-model="del_user" @click="del_user = !del_user">Удалить пользователя</v-btn> -->
    <!-- разворачивается список пользователей с крестиками  тут должен был быть бан пользователей но тут удаление-->
    <div>
        <DeleteUser 
                            v-for="user of myStore.users"
                            :key="user"
                            :user="user"/>
    </div>
 </template>
 
 <script setup>
    import { useStore } from "../store/app.js";
    import DeleteUser from "./DeleteUser.vue";
    const myStore = useStore();
 
    const props = defineProps({
    user: {
        type: Object,
        required: true,
        default: () => {},
        }
    });

    (function () {
        myStore.loadData()
    })();
 </script>