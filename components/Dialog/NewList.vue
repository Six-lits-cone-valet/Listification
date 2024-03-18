<script setup>
import { createNewList } from '@/idb/lists';
const appState = useAppState();
const isPending = ref(false);

const form = ref(null);
const newListTitle = ref('');
const newListTheme = ref('');

function setTheme(themeId) {
    newListTheme.value = themeId;
}

async function submitForm() {
    if (isPending.value) return;

    if (!newListTitle.value) {
        appState.value.message = {
            text: 'Please enter a name for the list.',
            type: 'warning'
        }
        return;
    }
    if (!newListTheme.value) {
        appState.value.message = {
            text: 'Please select a theme for the list.',
            type: 'warning'
        }
        return;
    }

    isPending.value = true;
    const newListId = await createNewList(newListTitle.value, newListTheme.value);

    form.value.reset();
    isPending.value = false;
    appState.value.activeDialog = 'myLists';

    appState.value.message = {
        text: 'The new list was successfully created.',
        type: 'success'
    }
}

</script>

<template>
    <div class="w100">
        <form ref="form" class="w100 flex column gap20" @submit.prevent="submitForm">
            <DialogListTypeIcons @selectTheme="setTheme" />

            <div class="flex column gap10">
                <input class="deepField" id="newList" type="text" placeholder="Nom de la liste" v-model="newListTitle"
                    autocomplete="off" />
            </div>

            <div class="flex handPreference" :class="{ 'justifyEnd' : !appState.leftHand}">
                <button class="pointer centered" type="submit">Créer</button>
            </div>
        </form>
    </div>
</template>

<style scoped>
input {
    height: 48px;
    font-size: 20px;
    font-weight: 600;
    padding: 0 10px;
    background-color: transparent;
}
button {
    font-weight: 600;
    color: var(--darker);
    background-color: var(--color);
    padding: 10px 20px;
    border-radius: 10px;
}
.handPreference.right {
    justify-content: flex-end;
}
.handPreference.left {
    justify-content: flex-start;
}
</style>~/idb/lists