<script setup>
import browserSupport from '@/idb/browserSupport';
const browserIsCompatible = ref(null);

const appState = useAppState();

onMounted(async () => {
    browserIsCompatible.value = browserSupport();
});

</script>

<template>
    <VitePwaManifest />
    
    <div class="appBox relative overflowHidden">
        <HeaderMain />

        <main v-if="browserIsCompatible" class="">
            <Welcome v-if="!appState.dbExists" />

            <div v-else class="mainContentbox full relative h100">
                <ActiveListMain class="" />

                <DialogBox v-if="appState.activeDialog" />
            </div>
        </main>

        <Bouzeux v-else />

        <AppMenuOverlay v-if="browserIsCompatible"  />

        <ToasterOverLay v-if="browserIsCompatible"  />
    </div>
</template>

<style scoped>
.appBox {
    height: 100vh;
    height: 100svh;
    height: 100dvh;
}

main {
    height: calc(100% - var(--header-height));
    flex-grow: 1;
    background-color: var(--darker);
}
.mainContentbox {
    padding: 0px 10px 0px 10px;
}

</style>