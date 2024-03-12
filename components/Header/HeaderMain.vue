<script setup>
const appState = useAppState(); 
</script>

<template>
    <header class="flex justifyBetween">
        <h1>
            <span>
                Listify
            </span>
        </h1>
        <!-- <HeaderDeleteData /> -->

        <div class="h100 flex alignCenter gap10">
            <svg id="myLists" class="pointer" @click="appState.activeDialog = 'myLists'" viewBox="0 -960 960 960">
                <path
                    d="M400-400h160v-80H400v80Zm0-120h320v-80H400v80Zm0-120h320v-80H400v80Zm-80 400q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320Zm0-80h480v-480H320v480ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-720v480-480Z" />
            </svg>

            <svg id="newList" @click="appState.activeDialog = 'newList'" class="pointer color_onHover"
                viewBox="0 -960 960 960">
                <path
                    d="M520-400h80v-120h120v-80H600v-120h-80v120H400v80h120v120ZM320-240q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320Zm0-80h480v-480H320v480ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-720v480-480Z" />
            </svg>
        </div>
    </header>
</template>

<style scoped>
header {
    padding: 10px;
    background-color: var(--dark);
    border-bottom: 1px solid var(--color);
}

svg {
    width: 24px;
    fill: var(--gray-light)
}
</style>