<script setup>


import browserSupport from '@/idb/browserSupport';
const browserIsCompatible = ref(null);

const appState = useAppState();

onMounted(async () => {
    browserIsCompatible.value = browserSupport();
});

</script>

<template>
  <div class="appBox flex column ">
    <Header />

    <main v-if="browserIsCompatible" class="" >
        <Welcome v-if="!appState.dbExists" />

        <div v-else class="full relative">
            <ActiveListMain class=""/>
            
            <DialogBox v-if="appState.activeDialog" />
        </div>
    </main>

    <Bouzeux v-else />
  </div>
</template>

<style scoped>
.appBox {
    height: 100vh;
    height: 100svh;
    height: 100dvh;
}

main {
    flex-grow: 1;
    background-color: var(--darker);
}


</style>