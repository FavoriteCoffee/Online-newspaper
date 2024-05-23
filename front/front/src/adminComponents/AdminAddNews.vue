<template>
    <v-card>
        <v-card-title>
            Создайте статью
        </v-card-title>
        <v-card-actions>
            
            <v-conteiner>
            <v-row>
                <v-text-field>
                    Автор 
                </v-text-field>
            </v-row>
            <v-row>
                <v-text-field>
                    Заголовок
                </v-text-field>
            </v-row>
            <v-row>
                <v-text-field>
                    Категории
                </v-text-field>
            </v-row>
            <v-row>
                <v-text-field>
                    Текст
                </v-text-field>
            </v-row>
            <v-row>
                <v-btn >
                Опубликовать 
                </v-btn>
            </v-row>
        </v-conteiner>

        </v-card-actions>
    </v-card>
</template>

<script setup>
import { useStore } from "../store/app.js";
const myStore = useStore();

</script>