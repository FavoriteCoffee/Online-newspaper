<template>
   <router-view /> 
  <v-card width="100%" height="80px" style=";background-image: url('./img/top.png'); padding-left: 14%; padding-right: 14%">
      <v-row>
        <v-col cols="8">
          <div style="float: left;"><b><h1 style="color: #fff; font-size: 5em;">LOGO</h1></b></div>
        </v-col>
      
        <v-col style="padding: 0; padding-top: 2em;" align="end" cols="2" >
          <v-btn @click="myStore.pushTestDataToDB()" style="float: right; margin: 2%;">{{ myStore.currentUser.userName }}</v-btn>
        </v-col>

        <v-col style="padding-top: 2em; " align="end" cols="2">
          <router-link to="/generalmain" class="nav-link">
            <v-btn @click="myStore.exit()" style="float: right; margin: 2%; background-color: #5f8b00; color: #fff;">Выход</v-btn>
          </router-link>
      </v-col>
    </v-row>
  </v-card>

 <!-- <v-card>
  <v-container style="margin-right: 0; margin-left: 0; width: 100%; ;background-image: url('./img/top.png'); color: #00006f;" >
        <v-row>
          <v-col cols="8">
            <div style="font-family: Georgia, 'Times New Roman', Times, serif;"
            class="overflow-auto">Online Newspaper {{ count }}</div>  
          </v-col>

          <v-col cols="4">
            
              <div v-if="show">
                <div :class="['text-body-1', 'pa-2']">Имя</div>  
                <v-btn>Выход true</v-btn>
              </div>
              <div v-else>
                <v-btn  style="background-color: #5f8b00; color: #fff;" @click="change">Вход <p class="material-icons">login</p></v-btn>

              </div>
          </v-col>
        </v-row>
  </v-container>
</v-card>   -->
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