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
    if( isPending.value ||
        !newListTitle.value ||
        !newListTheme.value 
    ) return;
    
    isPending.value = true;
    const newListId = await createNewList(newListTitle.value, newListTheme.value);
    appState.value.activeList = 5;
    form.value.reset();
    isPending.value = false;
    appState.value.activeDialog = 'myLists';
}

</script>

<template>
    <div class="grow pad20">
        <form ref="form" class="flex column gap20" @submit.prevent="submitForm">
            <DialogListTypeIcons @selectTheme="setTheme"/>

            <div class="flex column gap10">                
                <input id="newList" type="text" placeholder="List Name" v-model="newListTitle" autocomplete="off"/>
            </div>
            <button class="pointer" type="submit">Create</button>
        </form>
    </div>
</template>

<style scoped>
input[type="text"] {
    height: 48px;
    font-size: 18px;
    font-weight: 500;
    padding: 10px;
    border: 1px solid var(--gray-light);
    background-color: transparent;
    border-radius: 5px;
}
</style>~/idb/lists