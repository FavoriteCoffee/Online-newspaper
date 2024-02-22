<template>
    <v-container>
        <v-row>
            <div :class="['text-subtitle-1', 'pa-2']">{{ comment.author.userName }}</div>        
        </v-row>
        <v-row>
            <div :class="['text-body-1', 'pa-2']">{{ comment.text }}</div>
        </v-row>
        <v-row>
            <div :class="['text-body-1', 'pa-2']">{{ new Date(comment.date).getTime() }}</div>
        </v-row>
        <v-row>
            <div v-if="myStore.isCommentLiked(this.newsId, this.comment.id)">
                <v-col width="100%" align="end">
                    <p @click="myStore.changeCommentLike(this.newsId, this.comment.id)" 
                       style="color: #950400;">
                        <i class="material-icons">favorite</i>
                    </p>     
                </v-col>
            </div>
            <div v-else
                 >
                <v-col width="100%" align="end">
                    <p @click="myStore.changeCommentLike(this.newsId, this.comment.id)"
                       style="color: #950400;">
                        <i class="material-icons">favorite_border</i>
                    </p>     
                </v-col>
            </div>
        </v-row>
    </v-container>
</template>

<script setup>
import { useStore } from "./store/app.js";
const myStore = useStore();

const props = defineProps({
newsId: {
    type: Number,
    required: true,
    default: ""
},
comment: {
    type: Object,
    required: true,
    default: () => {},
}
});

</script>