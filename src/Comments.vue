<template>
        <v-container width="100%">
            <v-row>
                <div :class="['text-subtitle-1', 'pa-2']">Это комент</div>        
            </v-row>
            <v-row>
                <div :class="['text-body-1', 'pa-2']">{{ comment.text }}</div>
            </v-row>
            <v-row>
                <v-col width="100%" align="end">
                    <p style="color: #950400;"><i class="material-icons">favorite_border</i></p>     
                </v-col>
            </v-row>
        </v-container>
    <!-- <div>
        <div :class="['text-subtitle-1', 'pa-2']">Это комент</div>
        <div :class="['text-body-1', 'pa-2']">{{ comment.text }}</div>
        <v-btn>лайк подписка колокольчик"</v-btn>
    </div> -->
</template>

<script setup>
const props = defineProps({
    comment: {
        type: Object,
        required: true,
        default: () => {},
    }
});
</script>