import { defineStore } from "pinia";

export const useStore = defineStore('MyStore', {
    state: () => ({
        count: 7,
        news: [{id: 1, text: '1News', comments: [{text: "1коммент 1 новости"}, {text: "2коммент 1 новости"}, {text: "3коммент 1 новости"}]},
                 {id: 2, text: '2News', comments: [{text: "1коммент 2 новости"}, {text: "2коммент 2 новости"}, {text: "3коммент 2 новости"}]},
            	 {id: 3, text: '3News', comments: [{text: "1коммент 3 новости"}, {text: "2коммент 3 новости"}, {text: "3коммент 3 новости"}]}]
    })
});