<template>
    <div>
        <v-row>
            <v-col cols="12">
                <v-btn
                    v-model="show" 
                    @click="show = !show"
                    width="72%"
                    color="#8674AF"
                    variant="text"
                    style="margin: 15px;
                    text-align: right !important;">
                    {{ news.title }}
                </v-btn>
            </v-col> 
        </v-row>
        <v-divider ></v-divider>
        <v-row>
            <v-col cols="12">
                <DeleteComment v-if="show"
                    v-for="comment of this.news.comments"
                    :comment="comment" 
                    :newsId="this.news.id">
                </DeleteComment>
            </v-col>
        </v-row>
    </div>

</template>

<script setup>
    import { ref, computed } from 'vue';
    import { useStore } from "../store/app.js";
    import DeleteComment from "./DeleteComment.vue";
    import AdminDeleteComment from "./AdminDeleteComment.vue";
    const myStore = useStore();
    const show = ref(true);

    const props = defineProps({
        news: {
            type: Object,
            required: true,
            default: () => {},
        }
    });
</script>