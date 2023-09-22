<template>
    <div>
        <h2>Это комент</h2>
        <h2>{{ comment.text }}</h2>
        <input type="button" value="лайк подписка колокольчик"/>
    </div>
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