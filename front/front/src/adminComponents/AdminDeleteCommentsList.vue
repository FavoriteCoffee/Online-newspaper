<template>
    <v-card v-model="show" @click="show = !show">
        <v-card-text>{{ news.title }}</v-card-text>
    </v-card>
    
    <DeleteComment v-if="show"
        v-for="comment of this.news.comments"
        :comment="comment">
    </DeleteComment>
</template>

<script setup>
    import { ref, computed } from 'vue';
    import { useStore } from "../store/app.js";
    import DeleteComment from "./DeleteComment.vue";
    import AdminDeleteComment from "./AdminDeleteComment.vue";
    const myStore = useStore();
    const show = ref(false);

    const props = defineProps({
        news: {
            type: Object,
            required: true,
            default: () => {},
        }
    });


</script>