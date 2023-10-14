<template>
    <v-card 
        width="80%"
        style="margin: 10px; padding: 0; border-color: #A5CBE8; border: 10px; background-color: bisque;">

        <v-container style="padding: 0;">
            <v-row style=" padding: 0;">

                <v-col cols="4">
                    <v-img :src="news.img" alt="это картинка" cover width="100%" />
                </v-col>


                <v-col cols="8">

                    <!-- ЗАГОЛОВОК -->

                    <v-row>
                        <div :class="['text-h6', 'pa-2']">{{ news.id }})))) {{ news.title }}</div>
                    </v-row>

                    <!-- ТЕКСТ -->

                    <div v-if="showText">
                        <v-row>
                            <div class="overflow-auto" :class="['text-body-1', 'pa-2']">{{ news.text }}</div>
                        </v-row>
                        <v-row>
                            <v-btn @click="changeTextVisibility" width="100%">свернуть</v-btn>
                        </v-row>
                    </div>
                    <div v-else>
                        <v-row height="50px" class="overflow-hidden">
                            <div :class="['text-body-1', 'pa-2']">{{ news.text }}</div>
                        </v-row>
                        <v-row>
                            <v-btn @click="changeTextVisibility" width="100%">показать больше</v-btn>
                        </v-row>
                    </div>

                    <!-- БЛОК КНОПОК -->

                    <v-row >
                        <v-col align="end">
                            <div :class="['text-body-1', 'pa-2']">Опубликовано {{ news.data }}</div>
                        </v-col>

                        <v-col align="end">
                            <v-btn @click="changeCommentsVisibility">Комментарии (15)</v-btn>
                            <div :class="['text-body-1', 'pa-2']"></div>
                        </v-col>

                        <v-col align="end">
                            <v-btn>like(3)</v-btn>
                        </v-col>
                    </v-row>


                
                
                
                
                </v-col>                    

            </v-row>


<!-- КОММЕНТАРИИ -->
            <div v-if="showComments">
                <div v-if="showAllComents">
                    <v-row>
                        <v-col cols="4" offset="4">
                            <Comments v-for="comment of news.comments" :key="comment" :comment="comment"/>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col  align="end" cols="8" offset="4">
                            <v-btn @click="changeAllCommentsVisibility">Свернуть комментарии</v-btn>
                        </v-col>
                    </v-row>
                </div>

                <div v-else>
                    <v-row>
                    <v-col cols="4" offset="4">
                        <Comments v-for="comment of news.comments.slice(0, 2)" :key="comment" :comment="comment"/>
                    </v-col>
                    </v-row>

                    <v-row>
                        <v-col align="end" cols="8" offset="4">
                            <v-btn @click="changeAllCommentsVisibility">Еще комментарии</v-btn>
                        </v-col>
                    </v-row>
                </div>

                <v-row>
                    <v-col cols="8" offset="4">
                        <v-textarea
                        label="Оставьте комментарий"
                        maxlength="120"
                        single-line/>
                        <v-btn width="100%">Опубликовать</v-btn>
                    </v-col>
                </v-row>
            </div>
        </v-container>
    </v-card>
</template>

<script setup>
import Comments from './Comments.vue';
import { ref, computed } from 'vue';

const props = defineProps({
    news: {
        type: Object,
        required: true,
        default: () => {},
    }
});

const showText = ref(false)
const showComments = ref(false)
const showAllComents = ref(false)

const changeTextVisibility = () => {
    showText.value = !showText.value
}

const changeCommentsVisibility = () => {
    showComments.value = !showComments.value
}

const changeAllCommentsVisibility = () => {
    showAllComents.value = !showAllComents.value
}
</script>

<style>
v-col{
    padding: 0;
}
</style>