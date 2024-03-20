<template>
  <v-card 
    width="100%"
    height="80px"
    style="
    background-image: url('./img/top.png');
    padding-left: 14%;
    padding-right: 14%">
    <v-row>
      <v-col cols="8">
        <div 
        style="float: left;">
          <b><h1 style="color: #fff; font-size: 5em;">LOGO</h1></b>
        </div>
      </v-col>

      <v-col style="
        padding-top: 2em; "
        align="end"
        cols="2">
          <router-link to="/authentication" class="nav-link">
            <v-btn style="
              float: right;
              margin: 2%;
              background-color: #5f8b00;
              color: #fff;">
              Вход
            </v-btn>
          </router-link>
      </v-col>
    </v-row>
  </v-card>

  <div>
    <News v-for="news of myStore.news" :key="news.id" :news="news"/>
  </div>  
</template>
  
  <script setup>
  import News from './News.vue'
  import { ref, computed } from 'vue';
  import { useStore } from "./store/app.js";
  const myStore = useStore();
  
  const props = defineProps({
    classes:[
        ['He1', 'text-h1'],
        ['He2', 'text-h2']
      ]
  })
  
  const count = ref(5)
  const userIn = ref(false)
  
  const change = () => {
    userIn.value = !userIn.value
  }
  
  const increase = () => {
    count.value++
  }
  
(function () {
  myStore.loadData()
  localStorage.removeItem("user")
  myStore.userIn = false
})();
  </script>