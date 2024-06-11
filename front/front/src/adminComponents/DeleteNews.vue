<template>
    <v-card>
        <v-card-actions>
            <v-conteiner>
                <v-row>
                    <v-col>
                        {{ this.news.title }}
                    </v-col>
                    <v-col>
                        <v-btn @click="myStore.deleteNews(this.news.id)">
                            x 
                        </v-btn>
                    </v-col>
                </v-row>
            </v-conteiner>
            
        </v-card-actions>
    </v-card>
</template>

<script setup>
    import { useStore } from "../store/app.js";
    const myStore = useStore();

    const props = defineProps({
        news: {
            type: Object,
            required: true,
            default: () => {},
        }
    });
</script>