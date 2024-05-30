<!-- 
    "element" refers to either an item (in a list) or a list.  both use this component to be displayed on screen.
 -->

<script setup>
import { defineProps, defineEmits, ref, watch, watchEffect } from 'vue';

import icons from '@/assets/icons.json';
import {
    updateObject
} from '@/idb/objects'

import { 
        deleteListById, 
        toggleListIsImportant,
        updateList
} from '@/idb/lists';
import { 
    deleteItem, 
    toggleItemIsImportant,
    updateItem
} from '@/idb/items';

import { storeToRefs } from 'pinia';
import { useAppState } from '@/stores/appState';
const state = useAppState();
const { isPending, message, activeListId, keyboardOpen } = storeToRefs(state);

const props = defineProps({
    element: Object,
    text: String,
    store: String,
    itemId: String
});

const emit = defineEmits(['elementDeleted', 'refreshActiveList', 'refresh']);

const drawerPosition = ref('textVisible');
const menuOption = ref('');

async function requestDeleteItem() {
    if (isPending.value) return;

    isPending.value = true;

    if (props.store === 'items') {
        await deleteItem(props.itemId);

        message.value = {
            text: 'The item was deleted with great success.',
            type: 'danger'
        };
    } else if (props.store === 'lists') {
        await deleteListById(props.itemId);

        message.value = {
            text: 'The list was deleted with great success.',
            type: 'danger'
        };

        if(activeListId.value === props.itemId) {
            activeListId.value = '';
        }
    }
    emit('elementDeleted');
    
    isPending.value = false;
}

async function toggleIsImportant() {
    if (isPending.value) return;

    isPending.value = true;

    if(props.store === 'items') {
        await toggleItemIsImportant(props.itemId);
    } else if (props.store === 'lists') {
        await toggleListIsImportant(props.itemId);
    }
    emit('refresh');
    drawerPosition.value = 'textVisible';
    isPending.value = false;
}

// edit item

const editItemText = ref('');

function requestEditItem() {
    drawerPosition.value = 'menuOptions';
    menuOption.value = 'edition';
    editItemText.value = props.text;
}

async function updateElementText() {

    if (isPending.value) return;
    isPending.value = true;

    if (props.store === 'items') {
        await updateItem(props.itemId, 'text', editItemText.value);
    } else if (props.store === 'lists') {
        await updateList(props.itemId, 'name', editItemText.value)
    }
    drawerPosition.value = 'textVisible';

    editItemText.value = '';
    isPending.value = false;
    emit('refresh');
    

}

async function requestCheckItem() {
    if (isPending.value) return;
    isPending.value = true;

    updateObject("items", props.element.id, "isChecked", !props.element.isChecked ).then( res => {
        isPending.value = false;
        emit('refresh');
        drawerPosition.value = 'textVisible';
    }).catch( err => {
        console.log(err)
        message.value = err
        isPending.value = false;
        emit('refresh');
        drawerPosition.value = 'textVisible';
    })    
}
function cancelEdition() {
    menuOption.value = '';
    drawerPosition.value = 'menuVisible';
}
watch( menuOption, () => {
    keyboardOpen.value = menuOption.value === 'edition' ? true : false;
    console.log(keyboardOpen.value);
})

</script>

<template>
    <div class="bigBox" :class="{ 'isImportant': element.isImportant}">
        <div class="drawer w100" :class="drawerPosition">
            <!-- Text box -->
            <div class="box text" :class="{ 'rowReverse' : leftHand}">
                <div class="content gap10" :class="{ 'justifyEnd' : leftHand}">
                    <svg viewBox="0 -960 960 960" class="contentIcon" v-if="store === 'lists'">
                        <path :d="icons[element.theme].path" />
                    </svg>

                    <svg name="check" viewBox="0 -960 960 960" v-if="element.isChecked" class="icon_large check"
                        :class="{ 'active': element.isChecked }">
                        <path
                            d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                    </svg>

                    <svg name="imortant" viewBox="0 -960 960 960" class="contentIcon important"
                        :class="{ 'active': element.isImportant }"
                        v-if="store === 'items' && element.isImportant && !element.isChecked">
                        <path
                            d="M480-79q-16 0-30.5-6T423-102L102-423q-11-12-17-26.5T79-480q0-16 6-31t17-26l321-321q12-12 26.5-17.5T480-881q16 0 31 5.5t26 17.5l321 321q12 11 17.5 26t5.5 31q0 16-5.5 30.5T858-423L537-102q-11 11-26 17t-31 6Zm0-80 321-321-321-321-321 321 321 321Zm-40-281h80v-240h-80v240Zm40 120q17 0 28.5-11.5T520-360q0-17-11.5-28.5T480-400q-17 0-28.5 11.5T440-360q0 17 11.5 28.5T480-320Zm0-160Z" />
                    </svg>

                    <p class="textContent" :class="{ 'extraPadding' : !element.isImportant }">{{ text }}</p>
                </div>

                <div class="icons">
                    <svg name="menu" viewBox="0 -960 960 960" @click.stop="drawerPosition = 'menuVisible'"
                        class="icon_large pointer">
                        <path
                            d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z" />
                    </svg>
                </div>
            </div>
            <!-- Menu box -->
            <div class="box menu " :class="{ 'rowReverse' : leftHand}">
                <!-- cancel -->
                <div class="icons">
                    <svg name="close" viewBox="0 -960 960 960" @click.stop="drawerPosition = 'textVisible'"
                        class=" pointer icon_large">
                        <path
                            d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                    </svg>
                </div>

                <div class="content" :class="{ 'justifyEnd': !leftHand }">
                    <!-- edit text -->
                    <svg name="edit" viewBox="0 -960 960 960" @click.stop="requestEditItem"
                        class="icon_large edit pointer">
                        <path
                            d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                    </svg>

                    <!-- mark as checked -->
                    <svg name="check" viewBox="0 -960 960 960" @click.stop="requestCheckItem"
                        class="icon_large check pointer" :class="{ 'active' : element.isChecked }">
                        <path
                            d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                    </svg>
                    <!-- delete item -->
                    <svg name="delete" viewBox="0 -960 960 960"
                        @click.stop="menuOption = 'validation', drawerPosition = 'menuOptions'"
                        class="icon_large pointer">
                        <path
                            d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                    </svg>

                    <!-- mark as important -->
                    <svg name="imortant" viewBox="0 -960 960 960" @click.stop="toggleIsImportant"
                        class="icon_large pointer" :class="{ 'active' : element.isImportant}">
                        <path
                            d="M480-79q-16 0-30.5-6T423-102L102-423q-11-12-17-26.5T79-480q0-16 6-31t17-26l321-321q12-12 26.5-17.5T480-881q16 0 31 5.5t26 17.5l321 321q12 11 17.5 26t5.5 31q0 16-5.5 30.5T858-423L537-102q-11 11-26 17t-31 6Zm0-80 321-321-321-321-321 321 321 321Zm-40-281h80v-240h-80v240Zm40 120q17 0 28.5-11.5T520-360q0-17-11.5-28.5T480-400q-17 0-28.5 11.5T440-360q0 17 11.5 28.5T480-320Zm0-160Z" />
                    </svg>
                </div>

            </div>
            <!-- Menu Options box -->
            <div class="box options w100">
                <!-- confirmation box -->
                <div class="full validation warning flex" :class="{ 'rowReverse': leftHand }"
                    v-if="menuOption === 'validation'">
                    <div class="content" :class="{ 'justifyEnd': leftHand }">
                        <p class="textContent extraPadding">
                            {{ `Delete this ${ store === 'items' ? 'item' : 'list'} ?` }}
                        </p>
                    </div>

                    <div class="icons ">
                        <!-- confirm delete item-->
                        <svg name="check" viewBox="0 -960 960 960" @click.stop="requestDeleteItem"
                            class="pointer icon_large">
                            <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                        </svg>
                        <!-- cancel delete item-->
                        <svg name="close" viewBox="0 -960 960 960" @click.stop="drawerPosition = 'menuVisible'"
                            class="pointer icon_large">
                            <path
                                d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                        </svg>
                    </div>
                </div>
                <!-- edition box -->
                <div class="full edition flex" :class="{ 'rowReverse': leftHand }" v-if="menuOption === 'edition'"
                    @click.stop>
                    <div class="content" :class="{ 'justifyEnd': leftHand }">
                        <input class="textContent extraPadding" type="text" v-model="editItemText" v-focus>
                    </div>

                    <div class="icons">
                        <svg name="check" viewBox="0 -960 960 960" class="pointer icon_large"
                            @click="updateElementText">
                            <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                        </svg>

                        <svg name="close" viewBox="0 -960 960 960" @click.stop="cancelEdition"
                            class="pointer icon_large">
                            <path
                                d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.bigBox {
    --box-height: 48px;
    
    flex-shrink: 0;

    width: calc(100% - 2px);
    height: 48px;
    border: 1px solid rgba(163, 224, 255, 0.497);
    border-radius: 10px;
    overflow: hidden;
    box-sizing: content-box;
    position: relative;
}
.bigBox.isImportant {
    border: 1px solid var(--important);
}
.drawer {
    transition: 300ms ease;
    position: absolute;
    top: 0;
    left: 0;
}
.drawer.textVisible {
    transform: translateY(0px);
}
.drawer.menuVisible {
    transform: translateY(calc(var(--box-height) * -1));
    transition: 300ms ease;
}
.drawer.menuOptions {
    transform: translateY(calc(var(--box-height) * -2));
}
.box {
    width: 100%;
    height: var(--box-height);
    display: flex;
}

.box .edition {
    background-color: var(--success);
}
.box .warning {
    background-color: var(--danger);
}
.content,
.icons {
    height: 100%;
    display: flex;
}
.content {
    flex-grow: 1;
    display: flex;
    align-items: center;
}
.content {
    padding: 0 10px;
    font-weight: 600;
}
.contentIcon {
    width: 32px;
    height: 100%;
}
.textContent.extraPadding{
    font-size: 20px;
    font-weight: 600;
    padding-left: 10px;
}
svg {
    fill: var(--gray-light);
}
svg.important.active {
    fill: var(--important);
}
svg.check.active {
    fill: var(--success);
}
</style>