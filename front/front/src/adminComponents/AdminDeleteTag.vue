<template>
    <div> 
         <DeleteTag
                                 v-for="tag of myStore.categories"
                                 :key="tag"
                                 :tag="tag"/>
     </div>
</template>

<script setup>
    import { useStore } from "../store/app.js";
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

