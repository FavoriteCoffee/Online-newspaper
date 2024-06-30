<template>
    <div
        style="
        padding: 0px;
        padding-left: 10px;
        padding-right: 15px;">
            <v-row>
                <v-col cols="11">
                    <p style="margin: 15px;">{{ this.user.username }}</p>
                </v-col>

                <v-col cols="1">
                    <v-btn
                        variant="text" 
                        icon="mdi-delete-outline"
                        style="color: #8674AF;"
                        @click="myStore.deleteUser(user.id)"/>
                
                </v-col>
            </v-row>
            <v-divider ></v-divider>
    </div>
</template>

<script setup>
    import { useStore } from "../store/app.js";
    const myStore = useStore();

    const props = defineProps({
        user: {
            type: Object,
            required: true,
            default: () => {},
        }
    });
</script>