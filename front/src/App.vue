<template>
<!-- <v-btn @click="myStore.pushTestDataToDB()">загрузить</v-btn> -->
   <router-view /> 
</template>

<script setup>
  import { useStore } from "./store/app.js";
  const myStore = useStore();
</script>
