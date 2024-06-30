<template>
<router-view /> 
<v-card 
  width="100%"
  height="80px"
  style="background-image: url('http://localhost:3000/img/top.png');
  padding-left: 14%;
  padding-right: 14%;
  background-color: #5f8b00;
  ">

    <v-row>
      <v-col cols="8">
        <div 
          style="float: left;">
          <b><h1 style="
            color: #fff;
            font-size: 5em;">
            NIC
          </h1></b>
        </div>
      </v-col>
    
      <v-col style="
        padding: 0;
        padding-top: 2em;"
        align="end"
        cols="2" >
        <v-btn style="float: right; margin: 2%;">
          {{ myStore.getCurrentUserName() }}
        </v-btn>
      </v-col>

      <v-col 
        style="padding-top: 2em;" 
        align="end" 
        cols="2">
        <router-link to="/generalmain" class="nav-link">
          <v-btn 
          @click="myStore.exit()"
          style="
          float: right;
          margin: 2%;
          background-color: #5f8b00;
          color: #fff;">
            Выход
          </v-btn>
        </router-link>
    </v-col>
  </v-row>
</v-card>

</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from "./store/app.js";
const myStore = useStore();
</script>