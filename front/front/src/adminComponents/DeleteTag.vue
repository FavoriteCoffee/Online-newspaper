<template>
    <v-card>
        <v-card-title>
            <!-- {{ this.tag.title }} -->
        </v-card-title>
        <v-card-actions>
            <!-- <v-btn @click="myStore.deleteNews(this.tag.id)">
                x 
            </v-btn> -->
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