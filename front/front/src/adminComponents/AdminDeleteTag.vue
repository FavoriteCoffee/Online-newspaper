<template>
    <div>
        <Header></Header>
    </div>

    <v-card
     v-if="!myStore.isUserAnAdmin()"
    width="72%"
        style="
        margin: 10px;
        margin-left: 14%;
        padding: 0px;
        padding-left: 10px;
        padding-right: 15px;
        border: solid;
        border-color: #b4c987;
        background-color: #fff;">
        <div> 
            <DeleteTag
                                    v-for="tag of myStore.categories"
                                    :key="tag"
                                    :tag="tag"/>
        </div>
    </v-card>

    <v-card
    v-else
    width="72%"
        style="
        margin: 10px;
        margin-left: 14%;
        padding: 0px;
        padding-left: 10px;
        padding-right: 15px;
        border: solid;
        border-color: #b4c987;
        background-color: #fff;">
    <p>У вас недостаточно прав</p>
    </v-card>
</template>

<script setup>
    import { useStore } from "../store/app.js";
    import Header from "../Header.vue";
    import DeleteTag from './DeleteTag.vue';
    const myStore = useStore();

    const props = defineProps({
        news: {
            type: Object,
            required: true,
            default: () => {},
        }
    });

    (function () {
        myStore.loadData()
    })();
</script>

