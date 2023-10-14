<template>
<v-container style="margin: 0; background-repeat: repeat; background-image: url('./img/fon.png');" >
    <v-row width="200px" style="margin: 0;">
      <v-col cols="4">
        <v-sheet class="pa-2 ma-2">
          Основная страница {{ count }}
        </v-sheet>
      </v-col>

      <v-col cols="8">
        <v-sheet class="pa-2 ma-2">
          <div v-if="show">
            <div :class="['text-body-1', 'pa-2']">Имя</div>  
            <v-btn>Выход true</v-btn>
          </div>
          <div v-else>
            <v-btn @click="increase">Вход {{ count }}</v-btn>
            <v-btn @click="change">Вход false</v-btn>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>

  <v-card
    title=""
    style="margin: 15px; padding: 10px;">  
    <!-- <div :class="['text-h3', 'pa-2']">Основная страница</div>   -->
    
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
const show = ref(false)

const change = () => {
  show.value = !show.value
}

const increase = () => {
  count.value++
}
</script>

<!-- <script>
import News from './News.vue'
import { useStore } from "./store/app.js";
export default {
  components: { News },
  setup () {
    const myStore = useStore();
    return { myStore }
  },

  data: () => {
    slovoHui: 'hui'
  }
}
</script> -->