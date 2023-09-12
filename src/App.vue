<template>
  <h2>{{ this.$store.state.count }}</h2>
</template>

<script>

  export default {
    data() {
      return {
        page: 1,
      }
    },
    methods: {
      newPage() {
        if (this.page === 1){
          this.$router.push('main')
        }
        else if (this.page === 2){
          this.$router.push('authentication')
        }
        else if (this.page === 3){
          this.$router.push('registration')
        }
      }
    }
  }

</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
