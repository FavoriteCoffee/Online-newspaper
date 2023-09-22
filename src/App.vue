<template>
 <h1>Основная страница</h1>
 <News v-for="news of myStore.news" :key="news.id" :news="news"/>
</template>

<script setup>
import News from './News.vue'
import { useStore } from "./store.js";
const myStore = useStore();
</script>