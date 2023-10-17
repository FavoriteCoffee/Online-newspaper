<template>
  <MainPage/>
  <Authentication/>
  <Registration/>
  <!-- <router-view /> -->
</template>

<script setup>
  import MainPage from './MainPage.vue'
  import Authentication from './Authentication.vue';
  import Registration from './Registration.vue';
  import { registerPlugins } from './plugins';
</script>
