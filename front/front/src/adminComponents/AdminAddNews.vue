<template>
    <v-card>
        <v-card-title>
            Создайте статью
        </v-card-title>
        <v-card-actions>
            <v-conteiner style="width: 300px;">
            <v-row>
                <v-text-field v-model="title"
                label="Заголовок"/>
            </v-row>
            <v-row>
                <!-- <v-text-field label="Категории"/> -->
                <v-select
                chips
                label="Категории"
                v-model="myStore.selectedCategories"
                :items="myStore.getCategoriesNames()"
                multiple
                ></v-select>
            </v-row>
            <v-row>
                <v-text-field v-model="text"
                label="Текст"/>
            </v-row>
            <v-row>
                <v-text-field v-model="img"
                label="Изображение"/>
            </v-row>
            <v-row>
                <v-btn @click="myStore.addPost(text, title, img)">
                Опубликовать
                </v-btn>
            </v-row>
        </v-conteiner>
        </v-card-actions>
    </v-card>
</template>

<script setup>
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