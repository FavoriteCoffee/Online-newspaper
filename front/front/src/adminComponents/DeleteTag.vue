<template>
        <div
        style="
        padding: 0px;
        padding-left: 10px;
        padding-right: 15px;">
            <v-conteiner>
                <v-row>
                    <v-col cols="11">
                        <p style="margin: 15px;">{{ this.tag.name }}</p>
                    </v-col>
                    <v-col cols="1">
                        <v-btn
                        variant="text" 
                        @click="myStore.deleteTag(this.tag.id)"
                        icon="mdi-delete-outline"
                        style="color: #8674AF;">
                            
                        </v-btn>
                    </v-col>
                </v-row>
                <v-divider ></v-divider>
            </v-conteiner>
        </div>
</template>

<script setup>
    import { useStore } from "../store/app.js";
    const myStore = useStore();

    const props = defineProps({
        tag: {
            type: Object,
            required: true,
            default: () => {},
        }
    });
</script>