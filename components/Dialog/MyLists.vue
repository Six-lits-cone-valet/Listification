<script setup>
import { getLists } from '@/idb/lists';
import { setActiveList } from '@/idb/state';
const appState = useAppState();

const lists = ref(null);

function setListAsActive(listId) {
    appState.value.activeListId = listId;
    setActiveList(listId);
    appState.value.activeDialog = '';
}

async function loadLists() {
    lists.value = await getLists();
}

onMounted(async () => {
    loadLists()
});

</script>

<template>
    <div class="lists grow flex column gap10">
        <p v-if="lists && lists.length === 0">
            Vous n'avez pas de liste pour le moment.
        </p>
        
        <ElementCard v-for="list in lists" :key="list.id" class="pointer" @click="setListAsActive(list.id)"
            @elementDeleted="loadLists" @refresh="loadLists" :element="list" :text="list.name" :itemId="list.id"
            store="lists" />

        <ButtonCreateNew @clicked="appState.activeDialog = 'newList'">
            Create New List
        </ButtonCreateNew>
    </div>
</template>

<style scoped>
.list {
    background-color: var(--dark);
    border: 1px solid var(--gray-light);
    border-radius: 5px;
    overflow-y: scroll;
}
</style>