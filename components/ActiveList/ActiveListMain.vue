<script setup>
import { getActiveList } from '@/idb/state';
import { getListById } from '@/idb/lists';

// import icons from '@/assets/icons.json';
const appState = useAppState();

const activeList = ref([]);

onMounted(async () => {
    let list = await getActiveList();
    if (list) {
        activeList.value = list;
        console.log(list);
    }
})


</script>
<template>
    <div class="full">
        <div class="item createNew flex justifyEnd gap10 pad20 r" v-if="appState.activeList">

            <p> New item </p>
            <svg class="icon" viewBox="0 -960 960 960">
                <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
            </svg>
        </div>
    </div>
</template>

<style scoped>


</style>