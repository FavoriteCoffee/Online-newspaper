<template>
    <v-card>
       <v-card-text>
           {{ this.comment.text }}
       </v-card-text>
       <v-card-actions>
           <v-btn @click="myStore.deleteComment(this.newsId, this.comment.id)">
               x 
           </v-btn>
       </v-card-actions>
   </v-card>
</template>

<script setup>
   import { useStore } from "../store/app.js";
   const myStore = useStore();

   const props = defineProps({
       comment: {
           type: Object,
           required: true,
           default: () => {},
       },
       newsId: {
        type: Number,
        required: true,
        default: null
       } 
   });
</script>