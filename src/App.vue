<template>
  <MainPage/>
  <Authentication/>
  <Ragistration/>
  <!-- <router-view /> -->
</template>

<script setup>
  import MainPage from './MainPage.vue'
  import Authentication from './Authentication.vue';
  import Ragistration from './Ragistration.vue';
  import { registerPlugins } from './plugins';
</script>
