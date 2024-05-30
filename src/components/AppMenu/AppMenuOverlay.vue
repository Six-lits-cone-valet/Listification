<script setup>
import { ref } from 'vue';

import AppMenuHandSwitcher from '@/components/AppMenu/HandSwitcher.vue';

import { storeToRefs } from 'pinia';
import { useAppState } from '@/stores/appState';
const state = useAppState();
const { activeDialog, leftHand, keyboardOpen } = storeToRefs(state);

const menuIsOpen = ref(false);
function requestNewList() {
    activeDialog.value = 'newList';
    menuIsOpen.value = false;
}
function requestMyLists() {
    activeDialog.value = 'myLists';
    menuIsOpen.value = false;
}

function openMenu() {
    menuIsOpen.value = true;
    window.addEventListener('click', windowClick, true); 
}

function windowClick(e) {
    console.log('window click');

    if (e.target.closest('.drawer') || e.target.closest('.close')) {
        console.log('inside drawer');
        return;
    }
    menuIsOpen.value = false;
    window.removeEventListener('click', windowClick, true);
}
</script>

<template>
    <div class="box absolute w100 bottom0 left0 noEvents flex" :class="{ 'justifyEnd' : !leftHand}">
        <button class="centered allEvents pointer shadow" v-if="!keyboardOpen">
            <svg name="menu" class="icon_medium fill_gray-light meatBalls" viewBox="0 -960 960 960" v-if="!menuIsOpen"
                @click="openMenu">
                <path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z" />
            </svg>

            <!-- 
                Close button is handled by the windowClick function
             -->
            <svg name="close" class="icon_medium fill_gray-light" viewBox="0 -960 960 960" v-else>
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
        </button>

        <div class="drawer w100 absolute flex"
            :class="[{ 'visible': menuIsOpen}, { 'justifyEnd': !leftHand }]">
            <div class="menuBox flex column gap10 allEvents shadow" :class="[{ 'alignEnd': !leftHand }]">
                <div class="flex justifyEnd gap10">
                    <a href="https://github.com/Six-lits-cone-valet/Listification" target="_blank">
                        <svg class="icon_large fill_gray-light inside pointer" viewBox="0 0 16 16">
                            <path d="M8 1C4.133 1 1 4.13 1 7.993c0 3.09 2.006 5.71 4.787 6.635.35.064.478-.152.478-.337 0-.166-.006-.606-.01-1.19-1.947.423-2.357-.937-2.357-.937-.319-.808-.778-1.023-.778-1.023-.635-.434.048-.425.048-.425.703.05 1.073.72 1.073.72.624 1.07 1.638.76 2.037.582.063-.452.244-.76.444-.935-1.554-.176-3.188-.776-3.188-3.456 0-.763.273-1.388.72-1.876-.072-.177-.312-.888.07-1.85 0 0 .586-.189 1.924.716A6.711 6.711 0 018 4.381c.595.003 1.194.08 1.753.236 1.336-.905 1.923-.717 1.923-.717.382.963.142 1.674.07 1.85.448.49.72 1.114.72 1.877 0 2.686-1.638 3.278-3.197 3.45.251.216.475.643.475 1.296 0 .934-.009 1.688-.009 1.918 0 .187.127.404.482.336A6.996 6.996 0 0015 7.993 6.997 6.997 0 008 1z" />
                        </svg>
                    </a>
                </div>

                <AppMenuHandSwitcher />

                <div class="flex gap10 w100">
                    <svg id="myLists" class="icon_large fill_gray-light inside pointer" @click="requestMyLists"
                        viewBox="0 -960 960 960">
                        <path d="M400-400h160v-80H400v80Zm0-120h320v-80H400v80Zm0-120h320v-80H400v80Zm-80 400q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320Zm0-80h480v-480H320v480ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-720v480-480Z" />
                    </svg>

                    <svg id="newList" @click="requestNewList"
                        class="icon_large fill_gray-light inside pointer color_onHover" viewBox="0 -960 960 960">
                        <path d="M520-400h80v-120h120v-80H600v-120h-80v120H400v80h120v120ZM320-240q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320Zm0-80h480v-480H320v480ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-720v480-480Z" />
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
button {
    padding: 5px;
    background-color: var(--dark);
    border-radius: 50%;
    margin: 15px;
}

button:hover svg{
    fill: var(--color);
}
.drawer {
    top: 100%;
    left: 0;
    transform: translateY(0%);
    transition:  0.3s ease;
}
.drawer.visible {
    top: 0%;
    transform: translateY(-100%);
}
.menuBox {
    background-color: var(--dark);
    padding: 15px;
    border: 1px solid var(--gray-light);
    border-radius: 10px;
    margin: 15px;
}
</style>