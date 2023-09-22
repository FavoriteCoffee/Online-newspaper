<template>
  <header>  
    <h1>Основная страница</h1>

    <div v-if="true">
      <p>Имя</p>
      <input type="button" value="Выход"/>
    </div>
    <div v-else>
      <v-btn>Вход</v-btn>
    </div>
  </header>  

  <div>
    <News v-for="news of myStore.news" :key="news.id" :news="news"/>
  </div>  
</template>

<script setup>
import News from './News.vue'
import { useStore } from "./store.js";
const myStore = useStore();
</script>