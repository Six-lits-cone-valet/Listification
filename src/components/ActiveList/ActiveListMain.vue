<script setup>
import { ref, watch, onMounted } from 'vue';

import ElementCard from '@/components/ElementCard/ElementCard.vue';
import ButtonCreateNew from '@/components/Button/ButtonCreateNew.vue';

import icons from '@/assets/icons.json';
import { getActiveListId } from '@/idb/state';
import { getListDataById } from '@/idb/lists';
import { createNewItem } from '@/idb/items';

import { storeToRefs } from 'pinia';
import { useAppState } from '@/stores/appState';
const state = useAppState();
const { isPending, activeListId, activeDialog } = storeToRefs(state);

const activeListData = ref(null);

const requestingNewItem = ref(false);
const newItemText = ref('');

async function requestEditItem() {
    requestingNewItem.value = true;

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            saveNewItem();
        }
    })
}

async function saveNewItem() {
    if ( isPending.value ||
         newItemText.value === '' )  {
        return
    }
    isPending.value = true;
    await createNewItem(activeListId.value, newItemText.value);
    activeListData.value = await getListDataById(activeListId.value);
    requestingNewItem.value = false;
    newItemText.value = "";
    isPending.value = false;
}

function cancelNewItemCreation() {
    requestingNewItem.value = false;
    newItemText.value = "";
}

async function loadItems() {
    activeListData.value = await getListDataById(activeListId.value);
}

watch(
  () => activeListId.value,
  async (newId) => {

    try {
        activeListData.value = await getListDataById(newId);
    } catch (error) {
        console.error('Error getting list:', error);
    }
  }
)

onMounted(async () => {
    let listId = await getActiveListId();
    if (listId) {
        activeListId.value = listId;
    } else {
        activeDialog.value = 'newList'
    }
})

</script>

<template>
    <section class="full flex column" v-if="activeListData">
        <header class="flex alignCenter gap10" v-if="activeListId">
            <svg viewBox="0 -960 960 960" class="themeIcon"
                :class="[activeListData.isImportant ? 'fill_important' : 'fill_gray-light']">
                <path :d="icons[activeListData.theme].path" />
            </svg>

            <h2 class="">
                {{ activeListData.name }}
            </h2>
        </header>

        <main class="flex column ">
            <div class="items h100 flex column gap10">
                <div v-if="activeListData.items.length" class="flex column gap10">
                    <ElementCard v-for="item in activeListData.items" :key="item.id" :element="item" :text="item.text"
                        store="items" :itemId="item.id" @elementDeleted="loadItems" @refresh="loadItems" />
                </div>

                <div class="newItemBox relative w100 flex alignCenter" v-if="requestingNewItem">
                    <input class="newItem" type="text" v-model="newItemText" placeholder="Make pizza" v-focus>

                    <div class="closeButtonframe flex alignCenter gap10 h100">
                        <svg viewBox="0 -960 960 960" class="pointer icon" @click="saveNewItem">
                            <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                        </svg>

                        <svg @click="cancelNewItemCreation" viewBox="0 -960 960 960" class="pointer icon">
                            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                        </svg>
                    </div>
                </div>

                <ButtonCreateNew v-if="!requestingNewItem" @clicked="requestEditItem">
                    Ajouter un élément
                </ButtonCreateNew>

            </div>
        </main>
    </section>
</template>

<style scoped>
header {
    flex-shrink: 0;
    height: 60px;
}
.themeIcon {
    width: 30px;
    height: 30px;
}
.newItemBox {
    background-color: var(--success);
    border: 1px solid var(--gray-light);
    border-radius: 10px;
}
input {
    width: calc(100% - 70px);
}
.newItem {
    font-size: 18px;
    font-weight: 700;
    color: var(--light);
    padding: 10px;
}
.closeButtonframe {
    width: 70px;
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
    padding-top: 20px;
    padding-bottom: 100px;
    overflow: scroll;
}
</style>