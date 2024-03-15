<script setup>


import browserSupport from '@/idb/browserSupport';
const browserIsCompatible = ref(null);

const appState = useAppState();

onMounted(async () => {
    browserIsCompatible.value = browserSupport();
});

</script>

<template>
    <div class="appBox  overflowHidden">
        <HeaderMain />

        <main v-if="browserIsCompatible" class="">
            <Welcome v-if="!appState.dbExists" />

            <div v-else class="mainContentbox full relative h100">
                <ActiveListMain class="" />

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
    height: calc(100% - 60px);
    flex-grow: 1;
    background-color: var(--darker);
}
.mainContentbox {
    padding: 0px 10px 0px 10px;
}

</style>