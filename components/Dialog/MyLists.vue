<script setup>
import { getLists } from '@/idb/lists';
import { setActiveList } from '@/idb/state';
const appState = useAppState();

const lists = ref(null);

function setListAsActive(e) {
    console.log(e.currentTarget.dataset)
    // let listId = e.target.dataset.listId;
    // setActiveList(listId);
    // appState.value.activeList = listId;
    // console.log(appState.value.activeList);
}

onMounted(async () => {
    lists.value = await getLists();
    console.log(lists.value);
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