<template>
    <v-card>
        <v-card-actions>
            <v-conteiner>
                <v-row>
                    <v-col>
                        {{ this.tag.name }}
                    </v-col>
                    <v-col>
                        <v-btn @click="myStore.deleteTag(this.tag.id)">
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
        tag: {
            type: Object,
            required: true,
            default: () => {},
        }
    });
</script>