<template>
  <v-card
    style="padding: 10px; 
           margin-left:25%; 
           margin-top:50px;"
    width="50%"
    title="Регистрация">
      <v-text-field @blur="myStore.registrationData.enteredName = $event.target.value" label="Введите nick"/>
      <v-text-field @blur="myStore.registrationData.enteredPassword = $event.target.value" label="Введите пароль"/>


      <!-- <router-link to="/main" class="nav-link"> -->
        <v-btn style="margin-right: 10px;" @click="myStore.verificationOfRegistration()">OK</v-btn>
      <!-- </router-link> -->
      <router-link to="/authentication" class="nav-link">
        <v-btn>Вход</v-btn>
      </router-link>
  </v-card>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from "./store/app.js";
const myStore = useStore();
</script>

<style scoped>

</style>