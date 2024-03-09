<script setup>
import { getActiveList } from '@/idb/state';
import { getListById } from '@/idb/lists';

// import icons from '@/assets/icons.json';
const appState = useAppState();
const activeList = ref(null);

watch(
  () => appState.value.activeList,
  async (newId) => {
    activeList.value = await getListById(newId);
    console.log(activeList.value)
  }
)

// onMounted(async () => {
//     let list = await getActiveList();
//     if (list) {
//         activeList.value = list;
//     }
// })

</script>
<template>
    <div class="full r">
        <div class="item createNew flex justifyBetween gap10 pad20" v-if="appState.activeList">
            <h2 v-if="activeList">
                {{ activeList.name }}
            </h2>

            <div class="flex gap10">
                <p> New item </p>

                <svg class="icon" viewBox="0 -960 960 960">
                    <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
                </svg>
            </div>
        </div>
    </div>
</template>

<style scoped>


</style>