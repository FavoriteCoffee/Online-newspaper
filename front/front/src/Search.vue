<template>
    <v-card 
        class="mx-auto" 
        width="100%"
        style="
        margin: 10px;
        margin-top: 0;
        margin-left: 14%;
        padding: 0;
        padding-left: 14%;
        padding-right: 14%;

        background-color: #fff;">
        

        <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
        <v-row 
        style="margin-top: 0px;
        padding-bottom: 10px;">
            <v-col cols="8">
                <p
                style="
                font-size: 1.25rem;
                font-weight: 500;
                line-height: 1.6;
                letter-spacing: 0.0125em;"> Поиск по категориям</p>
            </v-col>    
            <v-col cols="3">
                <v-btn
                v-if="show"
                :loading="myStore.loading"
                color="#8674AF"
                variant="text"
                @click="show=false"
                style="float: right; padding: 0;"
                >
                Свернуть
                </v-btn>
                <v-btn
                v-else
                :loading="myStore.loading"
                color="#8674AF"
                variant="text"
                @click="show=true"
                style="float: right; float: top; padding: 0;"
                >
                Искать
                </v-btn>
            </v-col>
        </v-row>
        <v-spacer></v-spacer>
  
    <div v-if="show">
      <v-container style="padding: 0;">
        <v-row align="center" justify="start">
          <v-col
            v-for="(selection, i) in myStore.selections()"
            :key="selection.name"
            class="py-1 pe-0"
            cols="auto"
          >
            <v-chip
              :disabled="myStore.loading"
              closable
              @click:close="myStore.selected.splice(i, 1)"
            >
              <!-- <v-icon :icon="selection.icon" start></v-icon> -->
  
              {{ selection.name }}
            </v-chip>
          </v-col>
        </v-row>  

        <v-row>
          <v-col v-if="!myStore.allSelected()" cols="11">
            <v-text-field
              ref="searchField"
              v-model="myStore.search"
              label="Search"
              hide-details
              single-line
            ></v-text-field>
          </v-col>

          <v-col cols="1">
            <v-btn style="float: top; margin: 0;"
            icon="mdi-magnify" 
            @click="searchByCategories()"/>
          </v-col>
        </v-row>
      </v-container>
  
      <v-container style="padding: 0; margin: 0;">
        <v-row>
          <v-col cols="11">
            <v-divider v-if="!myStore.allSelected()"></v-divider>
            <v-list>
              <template v-for="item in myStore.tags()">
                <v-list-item
                  v-if="!myStore.selected.includes(item)"
                  :key="item.name"
                  :disabled="myStore.loading"
                  @click="myStore.selected.push(item)"
                >
                  <template v-slot:prepend>
                    <!-- <v-icon :disabled="myStore.loading" :icon="item.icon"></v-icon> -->
                  </template>
        
                  <v-list-item-title v-text="item.name"></v-list-item-title>
                </v-list-item>
              </template>
            </v-list>
          </v-col>
        </v-row>
      </v-container>
      <v-divider></v-divider>
      
    </div>
    </v-card>
  </template>
  

  <script setup>

  import { ref, computed } from 'vue';
  import { useStore } from "./store/app.js";
  const myStore = useStore();

  const show = ref(false)

  const searchByCategories = () => {
    show.value = false
    myStore.searchByCategories()
  }
  
  </script>