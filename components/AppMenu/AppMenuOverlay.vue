<script setup>
const appState = useAppState();
const menuIsOpen = ref(false);
function requestNewList() {
    appState.value.activeDialog = 'newList';
    menuIsOpen.value = false;
}
function requestMyLists() {
    appState.value.activeDialog = 'myLists';
    menuIsOpen.value = false;
}
</script>
<template>
    <div class="box absolute w100 bottom0 left0 noEvents flex" :class="{ 'justifyEnd' : !appState.leftHand}">
        <button class="centered allEvents pointer">
            <svg name="menu" class="menuIcon" viewBox="0 -960 960 960" @click.prevent.stop="menuIsOpen = true"
                v-if="!menuIsOpen">
                <path
                    d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z" />
            </svg>

            <svg name="close" class="menuIcon" viewBox="0 -960 960 960" @click.stop="menuIsOpen = false" v-else>
                <path
                    d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
        </button>

        <div class="drawer w100 absolute flex"
            :class="[{ 'visible': menuIsOpen}, { 'justifyEnd': !appState.leftHand }]">
            <div class="menuBox flex column gap10 allEvents" :class="[{ 'alignEnd': !appState.leftHand }]">
                <AppMenuHandSwitcher />

                <svg id="myLists" class="menuIcon pointer" @click="requestMyLists" viewBox="0 -960 960 960">
                    <path
                        d="M400-400h160v-80H400v80Zm0-120h320v-80H400v80Zm0-120h320v-80H400v80Zm-80 400q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320Zm0-80h480v-480H320v480ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-720v480-480Z" />
                </svg>

                <svg id="newList" @click="requestNewList" class="menuIcon pointer color_onHover"
                    viewBox="0 -960 960 960">
                    <path
                        d="M520-400h80v-120h120v-80H600v-120h-80v120H400v80h120v120ZM320-240q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320Zm0-80h480v-480H320v480ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-720v480-480Z" />
                </svg>
            </div>
        </div>
    </div>
</template>

<style scoped>
button {
    padding: 5px;
    background-color: var(--dark);
    border-radius: 50%;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.474);
    margin: 15px;
}
.menuIcon {
    width: 32px;
    fill: var(--gray-light);
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
    margin: 
}
</style>