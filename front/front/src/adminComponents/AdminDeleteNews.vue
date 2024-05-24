<template>
    <!-- <v-btn v-model="del_post" @click="del_post = !del_post">Удалить новость</v-btn> -->
     <!-- разворачивается список заголовков сегодняшних статей с крестиками -->
     <!-- <Comments 
                                 v-for="comment of myStore.getComments(this.news.id)" 
                                 :key="comment" 
                                 :comment="comment" 
                                 :newsId="this.news.id"/> -->
     <div> 
         <DeleteNews
                                 v-for="news of myStore.news"
                                 :key="news"
                                 :news="news"/>
     </div>
 </template>
 
 <script setup>
    import { useStore } from "../store/app.js";
    import DeleteNews from './DeleteNews.vue';
    const myStore = useStore();
    
    const props = defineProps({
    news: {
    type: Object,
    required: true,
    default: () => {},
    }
    });

    (function () {
        myStore.loadData()
    })();
 </script>