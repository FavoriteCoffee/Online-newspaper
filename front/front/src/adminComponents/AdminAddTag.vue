<template>
    <div>
        <Header></Header>
    </div>

    <v-card
     v-if="!myStore.isUserAnAdmin()"
    width="72%"
        style="
        margin: 10px;
        margin-left: 14%;
        padding: 0px;
        padding-left: 10px;
        padding-right: 15px;
        border: solid;
        border-color: #b4c987;
        background-color: #fff;">
        <v-card-title>
            Создайте категорию
        </v-card-title>
        <v-card-actions>
            <v-text-field v-model="text"
                label="Введите название"/>
            <v-btn 
            color="#8674AF"
            variant="text"
            @click="myStore.addTag(text)"
            style="margin-bottom: 20px;">
                Создать
            </v-btn>
        </v-card-actions>
    </v-card>

    <v-card
    v-else
    width="72%"
        style="
        margin: 10px;
        margin-left: 14%;
        padding: 0px;
        padding-left: 10px;
        padding-right: 15px;
        border: solid;
        border-color: #b4c987;
        background-color: #fff;">
    <p>У вас недостаточно прав</p>
    </v-card>
</template>

<script setup>
    import Header from "../Header.vue";
    import { useStore } from "../store/app.js";
    import { ref, computed } from 'vue';
    const myStore = useStore();

    const text = ref("")
</script>