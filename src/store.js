import { defineStore } from "pinia";

export const useStore = defineStore('MyStore', {
    state: () => ({
        count: 7,
        news: [{id: 1, text: '1News'}, {id: 2, text: '2News'}, {id: 3, text: '3News'}]
    })
});