<script setup>
import { onMounted } from 'vue';

import { initiateIdb } from '@/idb/initiateIdb';

import { storeToRefs } from 'pinia';
import { useAppState } from '@/stores/appState';
const state = useAppState();
const { dbExists } = storeToRefs(state);

async function handleClick() {
    console.log('clicked to createe db');
    
    const response = await initiateIdb();

    if(response.dbCreated === true) {
        localStorage.setItem('dbExists', 'true');

        dbExists.value = true;
    } else {
        console.log('error creating db');
    }
}

onMounted(async () => {
    dbExists.value = localStorage.getItem('dbExists');
});

</script>

<template>
    <div class="welcomePanel full flex column gap20 justifyCenter">

        <h1 class="">
            welcome to Listify
        </h1>

        We use IndexedDB to store your data locally. You data will not be stored on any server.  You can use the app and keep your lists even when you are offline.  Bur if you uninstall the app or clear your browser data, you will lose your lists.  We will soonly provide a way to save you lists to our server

        <button 
            class="colorOnHover pointer" 
            @click.prevent="handleClick">
            click to initialize you local database
        </button>
    </div>
        
</template>

<style scoped>
.welcomePanel {
    padding: 10%;
}
button {
    font-size: 18px;
    color: var(--gray-light);
    background-color: var(--dark);
    padding: 10px 20px;
    border: 1px solid var(--gray-light);
    border-radius: 10px;
}
</style>