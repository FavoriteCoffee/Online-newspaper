<template>
  <v-card
    style="padding: 10px; margin:15px; ackground-repeat: repeat; background-image: url('./img/fon.png');"
    width="50%"
    title="Регистрация">
      <v-text-field label="Введите nic"/>
      <v-text-field label="Введите пароль"/>
      <v-btn>Ввод</v-btn>
  </v-card>
</template>

<script>
export default {
  name: "Registration"
}
</script>

<style scoped>

</style>