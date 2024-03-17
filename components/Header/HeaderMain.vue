<script setup>
const appState = useAppState(); 
</script>

<template>
    <header class="flex justifyBetween alignCenter">
        <h1>
            Listification
        </h1>
    </header>
</template>

<style scoped>
h1 {
    font-size: 16px;
}
header {
    height: var(--header-height);
    padding-inline: 10px;
    background-color: var(--dark);
    border-bottom: 1px solid var(--color);
}

svg {
    width: 24px;
    fill: var(--gray-light)
}
</style>
