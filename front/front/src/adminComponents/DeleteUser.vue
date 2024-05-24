<template>
    <v-card>
        <v-card-title>
            {{ this.user.username }}
        </v-card-title>
        <v-card-actions>
            <v-btn @click="myStore.deleteUser(user.id)">
                x 
            </v-btn>
        </v-card-actions>
    </v-card>
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