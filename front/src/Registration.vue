<template>
  <v-card
    style="padding: 10px; margin:15px; ackground-repeat: repeat; background-image: url('./img/fon.png');"
    width="50%"
    title="Регистрация">
      <v-text-field @blur="myStore.registrationData.enteredName = $event.target.value" label="Введите nic"/>
      <v-text-field @blur="myStore.registrationData.enteredPassword = $event.target.value" label="Введите пароль"/>


      <!-- <router-link to="/main" class="nav-link"> -->
        <v-btn @click="myStore.verificationOfRegistration()">OK</v-btn>
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