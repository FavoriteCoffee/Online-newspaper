<template>
    <div>
        <Header></Header>
    </div>

    <v-card
     v-if="myStore.isUserAnAdmin()"
    width="72%"
        style="
        margin: 10px;
        margin-left: 14%;
        padding: 0px;
        padding-left: 10px;
        padding-right: 15px;
        border: solid;
        border-color: #b4c987;
        background-color: #fff;">
        <div>
            <DeleteUser 
                                v-for="user of myStore.users"
                                :key="user"
                                :user="user"/>
        </div>
    </v-card>

    <v-card
    v-else
    width="72%"
        style="
        margin: 10px;
        margin-left: 14%;
        padding: 0px;
        padding-left: 10px;
        padding-right: 15px;
        border: solid;
        border-color: #b4c987;
        background-color: #fff;">
    <p>У вас недостаточно прав</p>
    </v-card>
 </template>
 
 <script setup>
    import { useStore } from "../store/app.js";
    import Header from "../Header.vue";
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