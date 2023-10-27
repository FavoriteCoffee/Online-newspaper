<template>
  <v-card
    style="padding: 10px; margin:15px;"
    width="50%"
    title="Аутентификация">
      <v-text-field label="Введите nic"/>
      <v-text-field label="Введите пароль"/>
      <router-link to="/main" class="nav-link">
        <v-btn>OK</v-btn>
      </router-link>
      <router-link to="/registration" class="nav-link">
        <v-btn>Регистрация</v-btn>
      </router-link>
  </v-card>
</template>

<script>
export default {
  name: "Authentication"
}
</script>

<style scoped>

</style>