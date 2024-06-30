<template>
    <div 
        style="
        padding: 0px;
        padding-left: 10px;
        padding-right: 15px;">
        
            <v-container>
                <v-row>
                    <v-col cols="11">
                        {{ this.news.title }}
                    </v-col>
                    <v-col cols="1">
                        <v-btn
                        @click="myStore.deleteNews(this.news.id)"
                        variant="text" 
                        icon="mdi-delete-outline"
                        style="color: #8674AF;"/> 
                    </v-col>
                </v-row>
                <v-divider ></v-divider>
            </v-container>
            </div>
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