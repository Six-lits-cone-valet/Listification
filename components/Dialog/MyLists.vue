<script setup>
import { getLists } from '@/idb/lists';
const lists = ref(null);

onMounted(async () => {
    lists.value = await getLists();
    console.log(lists.value);
});

</script>

<template>
    <div class="grow flex column gap10 pad20">
        <div class="list flex alignCenter gap20" v-for="list in lists" :key="list.id">
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