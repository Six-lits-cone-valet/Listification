<script setup>
import { getLists } from '@/idb/lists';
import { setActiveList } from '@/idb/state';
const appState = useAppState();

const lists = ref(null);

function setListAsActive(e) {

    const listId = e.currentTarget.dataset.listid
    appState.value.activeList = listId;
    setActiveList(listId);
    appState.value.activeDialog = '';
}

onMounted(async () => {
    lists.value = await getLists();
});

</script>

<template>
    <div class="grow flex column gap10 pad20">
        <div 
            v-for="list in lists" :key="list.id"
            class="list flex alignCenter gap20 pointer"
            @click="setListAsActive"
            :data-listid="list.id">

            <DialogThemeIcon :iconId="list.theme" />

            <h2>{{ list.name }}</h2>  
        </div>
    </div>
</template>

<style scoped>
.list {
    background-color: var(--dark);
    border: 1px solid var(--gray-light);
    border-radius: 5px;
}
</style>