<template>
   <router-view /> 
   <!-- <MainPage/> -->


</template>

<script setup>
  import MainPage from './MainPage.vue'
  import GeneralMainPage from './GeneralMainPage.vue'
  import Authentication from './Authentication.vue';
  import Registration from './Registration.vue';
  import { registerPlugins } from './plugins';
</script>
