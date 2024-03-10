<script setup>
import { DialogNewList, DialogMyLists } from '#components';
const appState = useAppState();

const dialogs = {
    newList: {
        title: 'Create New List'
    },
    myLists: {
        title: 'My Lists'
    }
}

</script>
<template>
    <section class="dialogBox full absolute top0 left0 centered">
        <div class="dialog flex column relative">
            <h1 class="flex justifyEnd">
                <span class="grow">
                    {{ dialogs[appState.activeDialog].title}}
                </span>

                <svg @click="appState.activeDialog = ''"
                    viewBox="0 -960 960 960" 
                    class="pointer icon">
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                </svg>
            </h1>

            <DialogNewList v-if="appState.activeDialog === 'newList'" />

            <DialogMyLists v-if="appState.activeDialog === 'myLists'" />
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
    width: min(400px, 90%);
    min-height: 300px;
    background-color: var(--dark);
    border: 1px solid var(--gray-mid);
    border-radius: 10px;
    box-shadow: 1px 1px 5px rgb(0, 32, 25);
    box-shadow: 0px 0px 5px rgba(101, 211, 255, 0.115);
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
}
</style>