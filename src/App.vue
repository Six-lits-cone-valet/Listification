<script setup>
import { ref, onMounted, isRef } from 'vue';


import HeaderMain from '@/components/Header/HeaderMain.vue';
import WelcomeToListification from '@/components/WelcomeToListification.vue';
import ActiveListMain from '@/components/ActiveList/ActiveListMain.vue';
import DialogBox from '@/components/Dialog/DialogBox.vue';
import MerciDePatienter from '@/components/MerciDePatienter.vue';
import AppMenuOverlay from '@/components/AppMenu/AppMenuOverlay.vue';
import ToasterOverLay from '@/components/Toaster/ToasterOverLay.vue';

import browserSupport from '@/idb/browserSupport';

import { storeToRefs } from 'pinia';
import { useAppState } from '@/stores/appState';
const state = useAppState();
const { dbExists, activeDialog } = storeToRefs(state);

const browserIsCompatible = ref(null);

onMounted(async () => {
    browserIsCompatible.value = browserSupport();
});

</script>

<template>
    <div class="appBox relative overflowHidden">
        <HeaderMain />

        <main v-if="browserIsCompatible" class="">
            <WelcomeToListification v-if="!dbExists" />

            <div v-else class="mainContentbox full relative h100">
                <ActiveListMain class="" />

                <DialogBox v-if="activeDialog" />
            </div>
        </main>

        <MerciDePatienter v-else />

        <AppMenuOverlay v-if="browserIsCompatible" />

        <ToasterOverLay v-if="browserIsCompatible" />
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