<template>
  <router-view /> 

  <Header></Header>
  
  <div>
    <Search/>
  </div>
  
  <div>
    <NegativeSearch/>
  </div>

  <div>
    <News v-for="news of myStore.news" :key="news.id" :news="news"/>
  </div>  
</template>

<script setup>
import News from './News.vue'
import Search from './Search.vue'
import NegativeSearch from './NegativeSearch.vue'
import Header from './Header.vue';
import { ref, computed } from 'vue';
import { useStore } from "./store/app.js";
const myStore = useStore();
const props = defineProps({
  classes:[
      ['He1', 'text-h1'],
      ['He2', 'text-h2']
    ]
})

const userIn = ref(false)

const change = () => {
  userIn.value = !userIn.value
}

(function () {
  myStore.loadData()
  myStore.userIn = true
})();
 </script>