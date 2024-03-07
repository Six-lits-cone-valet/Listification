<script setup>
const appState = useAppState(); 


</script>

<template>
  <div class="appBox flex column">
    <Header />

    <main class="">
        <DialogBox v-if="appState.activeDialog"  />
    </main>
  </div>
</template>

<style scoped>
.appBox {
    height: 100vh;

}

main {
    flex-grow: 1;
    background-color: var(--darker);
}

</style>