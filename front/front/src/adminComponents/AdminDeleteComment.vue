<template>
    <!-- <v-btn v-model="del_comment" @click="del_comment = !del_comment">удалить комментарий</v-btn> -->
    
    <div>
        <AdminDeleteCommentsList 
                            v-for="news of myStore.news"
                            :key="news"
                            :news="news"/>
    </div>

</template>

<script setup>
   import { useStore } from "../store/app.js";
   import AdminDeleteCommentsList from "./AdminDeleteCommentsList.vue";
   const myStore = useStore();

   (function () {
        myStore.loadData()
    })();
</script>