<template>
    
    <Header></Header>

    <v-card
     v-if="!myStore.isUserAnAdmin()"
        width="72%"
        style="
        margin: 10px;
        margin-left: 14%;
        padding: 15px;
        padding-left: 10px;
        padding-right: 15px;
        border: solid;
        border-color: #b4c987;
        background-color: #fff;">
        <v-card-title style="margin:15px; margin-left: 0;">
            Создайте статью
        </v-card-title>
        <v-card-actions>
            <v-conteiner style="width: 92%; margin:15px; margin-left: 20px;">
            <v-row>
                <v-text-field v-model="title"
                label="Заголовок"/>
            </v-row>
            <v-row>
                <v-select
                chips
                label="Категории"
                v-model="myStore.selectedCategories"
                :items="myStore.getCategoriesNames()"
                multiple
                ></v-select>
            </v-row>
            <v-row>
                <v-textarea v-model="text"
                label="Текст"/>
            </v-row>
            <v-row>
                <v-text-field v-model="img"
                label="Изображение"/>
            </v-row>
            <v-row>
                <v-btn 
                    @click="myStore.addPost(text, title, img)"
                    variant="text" 
                    icon="mdi-delete-outline"
                    style="color: #8674AF; margin-left: 50px;">
                    Опубликовать
                </v-btn>
            </v-row>
        </v-conteiner>
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

    (function () {
        myStore.loadData()
    })();

    const text = ref("")
    const title = ref("")
    const img = ref("")


</script>