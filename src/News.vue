<template>
    <v-card 
        width="72%"
        style="margin: 10px; margin-left: 14%; padding: 0; border: solid; border-color: #b4c987;  background-color: #fff;">

        <v-container style="padding: 0; margin: 0;">
            <v-row style=" padding: 0;">

                <v-col cols="4">
                    <v-img :src="news.img" alt="это картинка" cover width="100%" />
                </v-col>


                <v-col cols="8" style="padding-right: 6%;">

                    <!-- ЗАГОЛОВОК -->

                    <v-row style="padding: 0; margin-top: 0;">
                        <v-col>
                            <div style="font-size: 2em; font-family: Georgia, 'Times New Roman', Times, serif;">{{ news.id }} {{ news.title }}</div>
                        </v-col>

                        <v-col>
                            <div align="end" :class="['text-body-2', 'pa-2']">Опубликовано {{ news.data }}</div>
                        </v-col>
                    </v-row>

                    <!-- ТЕКСТ -->

                    <div v-if="showText">
                        <v-row style="font-family: Verdana, Geneva, Tahoma, sans-serif; font-size: 1em; padding: 0; margin-right: 1%; margin-left: 1%;">
                            <div class="overflow-auto" >{{ news.text }}</div>
                        </v-row>
                        <!-- <v-row>
                            <v-btn @click="changeTextVisibility" width="100%">свернуть</v-btn>
                        </v-row> -->
                    </div>
                    <div v-else >
                        <v-row>
                            <div style="height: 70px; margin-left: 1%;" class="overflow-hidden" :class="['text-body-1', 'pa-2']">{{ news.text }}</div>
                        </v-row>
                    </div>

                    <!-- БЛОК КНОПОК -->

                    <v-row style="margin-top: 4%; margin-bottom: 1%;">

                        <v-col v-if="showText">
                            <p @click="changeTextVisibility" width="100%" style="padding: 0; margin-bottom: 1%;"><p class="material-icons">expand_less</p></p>
                        </v-col>
                        <v-col v-else >
                            <p @click="changeTextVisibility" width="100%" style="padding: 0; margin-bottom: 1%;"><p class="material-icons">expand_more</p></p>
                        </v-col>

                        <v-col align="end" cols="3" offset="7">
                            <p @click="changeCommentsVisibility">Комментарии (15)</p>
                            <!-- <div :class="['text-body-1', 'pa-2']"></div> -->
                        </v-col>

                        <v-col align="end" style="padding-right: 0;">
                            <!-- <v-btn class="material-icons">language</v-btn> -->
                            <p style="color: #950400;"><i class="material-icons">favorite_border</i></p>
                        </v-col>
                    </v-row>
                           
                </v-col>                    

            </v-row>


<!-- КОММЕНТАРИИ -->
            <div v-if="showComments">
                <div v-if="showAllComents">
                    <v-row style="padding-right: 6%; padding-left: 4%;">
                        <v-col style="padding: 0; margin-top: 1%;" cols="8" offset="4">
                            <Comments v-for="comment of news.comments" :key="comment" :comment="comment"/>
                        </v-col>
                    </v-row>

                    <v-row style="padding-right: 6%; ; padding-left: 4%;">
                        <v-col  align="end" cols="8" offset="4">
                            <v-btn @click="changeAllCommentsVisibility"><p class="material-icons">expand_less</p> Свернуть комментарии</v-btn>
                        </v-col>
                    </v-row>
                </div>

                <div v-else>
                    <v-row style="padding-right: 6%; ; padding-left: 2%; margin-top: 1%;">
                        <v-col cols="8" offset="4">
                            <Comments v-for="comment of news.comments.slice(0, 2)" :key="comment" :comment="comment"/>
                        </v-col>
                    </v-row>

                    <v-row style="padding-right: 6%; ; padding-left: 4%;">
                        <v-col align="end" cols="8" offset="4">
                            <v-btn @click="changeAllCommentsVisibility"><p class="material-icons">expand_more</p> Еще комментарии</v-btn>
                        </v-col>
                    </v-row>
                </div>

                <v-row style="padding-right: 6%; ; padding-left: 2%; margin-bottom: 1%;">
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