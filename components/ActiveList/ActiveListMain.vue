<script setup>
import { getActiveList } from '@/idb/state';
import { getListById } from '@/idb/lists';
import { createNewItem, deleteItem } from '@/idb/items';

// import icons from '@/assets/icons.json';
const appState = useAppState();
const activeList = ref(null);

const requestingNewItem = ref(false);
const newItemText = ref('');


async function saveNewItem() {
    if ( appState.value.isPending ||
         newItemText.value === '' )  {
        return
    }
    appState.value.isPending = true;
    await createNewItem(appState.value.activeList, newItemText.value);
    activeList.value = await getListById(appState.value.activeList);
    requestingNewItem.value = false;
    newItemText.value = "";
    appState.value.isPending = false;
}

function cancelNewItemCreation() {
    requestingNewItem.value = false;
    newItemText.value = "";
}

async function loadItems() {
    activeList.value = await getListById(appState.value.activeList);
}

watch(
  () => appState.value.activeList,
  async (newId) => {

    try {
        activeList.value = await getListById(newId);
    } catch (error) {
        console.error('Error getting list:', error);
    }
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
    <section class="full flex column" v-if="activeList">
        <header class="flex justifyBetween alignCenter gap10" v-if="appState.activeList">
            <h2 class="">
                {{ activeList.name }}
            </h2>


        </header>

        <main class="flex column ">
            <div class="items h100 flex column gap10">
                <ElementCard v-if="activeList.items.length" v-for="item in activeList.items" :key="item.id"
                    :element="item" :text="item.text" store="items" :itemId="item.id" @elementDeleted="loadItems"
                    @refreshActiveList="loadItems" />

                <div class="newItemBox" v-if="requestingNewItem">
                    <form class="relative flex justifyEnd alignCenter">
                        <input class="itemText grow" type="text" v-model="newItemText" placeholder="Make pizza" v-focus>

                        <div class="closeButtonframe flex alignCenter gap10 h100">
                            <svg viewBox="0 -960 960 960" class="pointer icon" @click="saveNewItem">
                                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                            </svg>

                            <svg @click="cancelNewItemCreation" viewBox="0 -960 960 960" class="pointer icon">
                                <path
                                    d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                            </svg>
                        </div>
                    </form>
                </div>

                <ButtonCreateNew @clicked="requestingNewItem = true">
                    Create New 
                </ButtonCreateNew>
          
            </div>
        </main>
    </section>
</template>

<style scoped>
header {
    height: 60px;
    flex-shrink: 0;
}

.newItemBox {
    background-color: var(--success);
    border: 1px solid var(--gray-light);
    border-radius: 10px;
}
input[type="text"] {
    /* width: 100%; */
    padding: 10px;
    color: var(--light);
}
.closeButtonframe {
    margin: 0 10px;
}
.icon {
    width: 30px;
    height: 30px;
}
main {
    height: calc(100% - 60px);
}
.items {
    overflow: scroll;
}
</style>