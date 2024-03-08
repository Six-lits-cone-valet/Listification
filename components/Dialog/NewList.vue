<script setup>
import { createNewList } from '@/idb/lists';
const isPending = ref(false);

const newListTitle = ref('');
const newListTheme = ref('');

function setTheme(themeId) {
    newListTheme.value = themeId;
}

async function submitForm() {
    if(isPending.value) return;
    
    isPending.value = true;
    const response = await createNewList(newListTitle.value, newListTheme.value);
    console.log(response);
    isPending.value = false;
}

</script>

<template>
    <div class="grow pad20">
        <form class="flex column gap20" @submit.prevent="submitForm">
            <DialogListTypeIcons @selectTheme="setTheme"/>

            <div class="flex column gap10">
                <lable for="newList">New List</lable>
                <input id="newList" type="text" placeholder="List Name" v-model="newListTitle" />
            </div>
            <button type="submit">Create</button>
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