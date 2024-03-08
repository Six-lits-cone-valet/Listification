<script setup>
import { initiateIdb } from '@/idb/initiateIdb';
import browserSupport from '@/idb/browserSupport';
const dbExists = ref(false);
const browserIsCompatible = ref(null);

const appState = useAppState();

async function handleClick() {
    const response = await initiateIdb();

    if(response.dbCreated === true) {
        localStorage.setItem('dbExists', 'true');

        dbExists.value = localStorage.getItem('dbExists');
    }
}

onMounted(async () => {
    browserIsCompatible.value = browserSupport();
    dbExists.value = localStorage.getItem('dbExists');
});
</script>

<template>
  <div class="appBox flex column ">
    <Header />

    <main v-if="browserIsCompatible" class="" >
        <Welcome v-if="!dbExists" />

        <div v-else class="full relative">
            <ActiveListMain />
            
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