<template>
 <h1>Основная страница</h1>
 <news v-for="news of myStore.news" :key="news.id" :news="news"/>
</template>

<script>
const props = defineProps({
  news: {
    
  }
})
</script>

<style scoped>

</style>