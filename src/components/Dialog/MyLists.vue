<script setup>
import { ref, onMounted } from 'vue';

import ElementCard from '@/components/ElementCard/ElementCard.vue';
import ButtonCreateNew from '@/components/Button/ButtonCreateNew.vue';

import { getLists } from '@/idb/lists';
import { setActiveList } from '@/idb/state';

import { storeToRefs } from 'pinia';
import { useAppState } from '@/stores/appState';
const state = useAppState();
const { activeListId, activeDialog } = storeToRefs(state);

const lists = ref(null);

function setListAsActive(listId) {
    activeListId.value = listId;
    setActiveList(listId);
    activeDialog.value = '';
}

async function loadLists() {
    lists.value = await getLists();
}

onMounted(async () => {
    loadLists()
});

</script>

<template>
    <div class="lists flex column gap10 grow">
        <p v-if="lists && lists.length === 0">
            Vous n'avez pas de liste pour le moment.
        </p>
        
        <ElementCard v-for="list in lists" :key="list.id" class="pointer" @click="setListAsActive(list.id)"
            @elementDeleted="loadLists" @refresh="loadLists" :element="list" :text="list.name" :itemId="list.id"
            store="lists" />

        <ButtonCreateNew @clicked="activeDialog = 'newList'">
            Nouvelle liste
        </ButtonCreateNew>
    </div>
</template>

<style scoped>

.list {
    background-color: var(--dark);
    border: 1px solid var(--gray-light);
    border-radius: 5px;
}
</style>