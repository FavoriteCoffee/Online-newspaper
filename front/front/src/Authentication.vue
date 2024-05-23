<template>
  <v-card
    style="
    padding: 10px;
    margin-left:25%;
    margin-top:50px;"
    width="50%"
    title="Аутентификация">
      <v-text-field 
        @blur="myStore.authenticationData.enteredUserName = $event.target.value"
        label="Введите электронную почту"/>
      <v-text-field 
        @blur="myStore.authenticationData.enteredPassword = $event.target.value"
        label="Введите пароль"/>

      <v-btn 
        style="
        margin-right: 10px;"
        @click="myStore.verificationOfAuthentication()">
        OK
      </v-btn>

      <router-link to="/registration" class="nav-link">
        <v-btn>Регистрация</v-btn>
      </router-link>
  </v-card>
</template>

<script setup>
import { useStore } from "./store/app.js";
const myStore = useStore();
</script>

<style scoped>

</style>