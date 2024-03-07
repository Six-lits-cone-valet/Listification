<script setup>
const myLocalLists = localStorage.getItem('myLists') ? JSON.parse(localStorage.getItem('myLists') ): [];

const listName = ref('');


const newList = ref({
    title: '',
    theme: '',
    items: []
});

function setTheme(themeId) {
    newList.theme = themeId;
}

function submitForm() {
    myLocalLists.push(newList.value);
    localStorage.setItem('myLocalLists', JSON.stringify(myLocalLists));
}
</script>

<template>
    <div class="grow pad20">
        <form class="flex column gap20" @submit.prevent="submitForm">
            <DialogListTypeIcons @selectTheme="setTheme"/>

            <div class="flex column gap10">
                <lable for="newList">New List</lable>
                <input id="newList" type="text" placeholder="List Name" v-model="newList.title" />
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
</style>