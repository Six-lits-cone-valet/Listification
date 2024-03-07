<script setup>
const appState = useAppState(); 
</script>
<template>
    <section class="dialogBox full centered ">
        <div class="dialog flex column relative">
            <div class="content grow">
                <DialogNewList v-if="appState.activeDialog === 'newList'" />
                <DialogMyLists v-if="appState.activeDialog === 'myLists'" />
            </div>

            <svg 
                @click="appState.activeDialog = ''"
                viewBox="0 -960 960 960"
                class=" absolute top0 right0 pointer">
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
            </svg>
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

.dialog {
    width: min(400px, 100%);
    min-height: 300px;
    border: 1px solid var(--gray-mid);
    border-radius: 10px;
    box-shadow: 1px 1px 5px rgb(0, 32, 25);
    overflow: hidden;
}

.content {
    padding:  10px;

}

svg {
    width: 24px;
    fill: var(--gray-light);
    margin: 15px;
}
</style>