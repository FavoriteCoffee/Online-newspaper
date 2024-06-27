<template>
    <v-card 
    v-if="myStore.showErrMsg"
    style="
    color:#fff;
    background-color: #a00;
    height: 50px;
    padding-left: 10px; 
    margin-left:25%; 
    margin-top:20px;
    margin-bottom: -30px;"
    width="50%"
    :title="myStore.currentErrMsg">
    <v-container>
        <!-- {{ myStore.currentErrMsg }} -->
    </v-container>
  </v-card>

  <v-card
    style="
    border:3cm ; border-color:#F00;
    padding: 10px;
    margin-left:25%;
    margin-top:50px;"
    width="50%"
    title="Аутентификация">
      <v-text-field 
        style="border:5px; border-color:#F00"
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

      <router-link to="/admin" class="nav-link"
      style="float: right;">
        <a>Войти как администратор</a>
      </router-link>
  </v-card>
</template>

<script setup>
import { useStore } from "./store/app.js";
const myStore = useStore();

(function () {
  myStore.showErrMsg = false
})();
</script>

<style scoped>

</style>