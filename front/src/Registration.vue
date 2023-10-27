<template>
  <v-card
    style="padding: 10px; margin:15px; ackground-repeat: repeat; background-image: url('./img/fon.png');"
    width="50%"
    title="Регистрация">
      <v-text-field label="Введите nic"/>
      <v-text-field label="Введите пароль"/>
      <v-text-field label="Введите имя"/>
      <v-text-field label="Введите фамилию"/>

      <router-link to="/main" class="nav-link">
        <v-btn>OK</v-btn>
      </router-link>
      <router-link to="/authentication" class="nav-link">
        <v-btn>Вход</v-btn>
      </router-link>
  </v-card>
</template>

<script>
export default {
  name: "Registration"
}
</script>

<style scoped>

</style>