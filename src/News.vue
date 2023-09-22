<template>
    <div>
        <h2>Это блок с news</h2>
        <h3>тут картинка</h3>
        <h2>{{ news.id }}</h2>
        <h2>{{ news.text }}</h2>
    </div>
    <Comments v-for="comment of news.comments" :key="comment" :comment="comment"/>
</template>

<script setup>
import Comments from './Comments.vue';
const props = defineProps({
    news: {
        type: Object,
        required: true,
        default: () => {},
    }
});
</script>