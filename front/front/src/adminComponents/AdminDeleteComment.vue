<template>
    <v-card>
        <v-card-title>
            Создайте категорию
        </v-card-title>
        <v-card-actions>
            <v-text-field>
                Введите название 
            </v-text-field>
            <v-btn >
                Создать
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>
import { useStore } from "../store/app.js";
const myStore = useStore();

</script>