<template>
    <v-card>
        <v-card-title>
            Создайте категорию
        </v-card-title>
        <v-card-actions>
            <v-text-field v-model="text"
                label="Введите название"/>
            <v-btn @click="myStore.addTag(text)">
                Создать
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>
    import { useStore } from "../store/app.js";
    import { ref, computed } from 'vue';
    const myStore = useStore();

    const text = ref("")
</script>