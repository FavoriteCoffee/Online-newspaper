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
    padding: 10px; 
    margin-left:25%; 
    margin-top:50px;"
    width="50%"
    title="Регистрация">
      <v-text-field 
        @blur="myStore.registrationData.enteredName = $event.target.value"
        label="Введите имя"/>
        <v-text-field 
        @blur="myStore.registrationData.enteredSurname = $event.target.value"
        label="Введите фамилию"/>
        <v-text-field 
        @blur="myStore.registrationData.enteredUserName = $event.target.value"
        label="Введите электронную почту"/>
      <v-text-field
        @blur="myStore.registrationData.enteredPassword = $event.target.value" 
        label="Введите пароль"/>
      <v-btn 
        style="margin-right: 10px;"
        @dblclick="myStore.gotoAnotherPage('/main')" 
        @click="myStore.verificationOfRegistration()">
        OK
      </v-btn>
      <router-link to="/authentication" class="nav-link">
        <v-btn>Вход</v-btn>
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