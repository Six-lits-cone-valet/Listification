<script setup>
import DialogNewList from '@/components/Dialog/NewList.vue';
import DialogMyLists from '@/components/Dialog/MyLists.vue';

import { storeToRefs } from 'pinia';
import { useAppState } from '@/stores/appState';
const state = useAppState();
const { activeDialog } = storeToRefs(state);

const dialogs = {
    newList: {
        title: 'Nouvelle liste'
    },
    myLists: {
        title: 'Mes listes'
    }
}

</script>
<template>
    <section class="dialogBox full absolute top0 left0 centered">
        <div class="dialog flex column relative">
            <h1 class="flex justifyEnd">
                <span class="grow">
                    {{ dialogs[activeDialog].title}}
                </span>

                <svg @click="activeDialog = ''" viewBox="0 -960 960 960" class="pointer icon">
                    <path
                        d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                </svg>
            </h1>

            <div class="content w100">
                <DialogNewList v-if="activeDialog === 'newList'" />

                <DialogMyLists v-if="activeDialog === 'myLists'" />
            </div>
        </div>
    </section>
</template>

<style>
.dialogH1 {
    background-color: var(--gray-dark);
    padding:  10px;
}
</style>

<style scoped>
.dialogBox {
    background-color: rgba(0, 29, 38, 0.709);
}
.dialog {
    width: min(400px, 96%);
    min-height: 300px;
    max-height: 75vh;
    background-color: var(--dark);
    border: 1px solid var(--gray-mid);
    border-radius: 10px;
    box-shadow: 1px 1px 5px rgb(0, 32, 25);
    box-shadow: 0px 0px 5px rgba(101, 211, 255, 0.115);
    padding-bottom: 10px;
    overflow: hidden;
}
h1 {
    padding: 10px;
}
h1 span {
    overflow: hidden;
}
.content {
    padding:  10px;
    max-height: 70vh;
    overflow-y: scroll;
}
</style>