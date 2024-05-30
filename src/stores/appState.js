import { reactive } from 'vue';
import { defineStore } from 'pinia';

export const useAppState = defineStore('appState', {
    state: () => ({ 
        keyboardOpen: false, // on screen keyboard on mobile
        activeDialog: '',
        activeListId: '',
        myLists: [],
        dbExists: false,
        isPending: false,
        leftHand: false,
        message: reactive({
            type: '',
            text: ''
        })
    }) 
});
