<template>
    <div
    style="
        padding: 0px;
        padding-left: 10px;
        padding-right: 15px;">
        <v-container>
            <v-row>
                <v-col cols="11">
                    <p style="margin: 15px;">{{ this.comment.text }}</p>
                </v-col>                
                <v-col cols="1">
                    <v-btn 
                        @click="myStore.deleteComment(this.newsId, this.comment.id)"
                        variant="text" 
                        icon="mdi-delete-outline"
                        style="color: #8674AF;"/>
                </v-col>
            </v-row>
        <v-divider ></v-divider>
        </v-container>         
    </div>
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