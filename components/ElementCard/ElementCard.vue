<script setup>
import icons from '@/assets/icons.json';
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

const drawerPosition = ref('textVisible');
const menuOption = ref('');

const appState = useAppState();

const props = defineProps({
    element: Object,
    text: String,
    store : String,
    itemId: String
});

const emit = defineEmits(['elementDeleted', 'refreshActiveList', 'refresh']);

async function requestDeleteItem() {
    if (appState.value.isPending) return;

    appState.value.isPending = true;

    if (props.store === 'items') {
        await deleteItem(props.itemId);

        appState.value.message = {
            text: 'The item was deleted with great success.',
            type: 'danger'
        };
    } else if (props.store === 'lists') {
        await deleteListById(props.itemId);

        appState.value.message = {
            text: 'The list was deleted with great success.',
            type: 'danger'
        };

        if(appState.value.activeListId === props.itemId) {
            appState.value.activeListId = '';
        }
    }
    emit('elementDeleted');
    
    appState.value.isPending = false;
}
async function toggleIsImportant() {
    if (appState.value.isPending) return;

    appState.value.isPending = true;

    if(props.store === 'items') {
        await toggleItemIsImportant(props.itemId);
    } else if (props.store === 'lists') {
        await toggleListIsImportant(props.itemId);
    }
    // emit('refreshActiveList');
    props.element.isImportant = !props.element.isImportant;
    drawerPosition.value = 'textVisible';
    appState.value.isPending = false;
}

// edit item

const editItemText = ref('');

function requestEditItem() {
    drawerPosition.value = 'menuOptions';
    menuOption.value = 'edition';
    editItemText.value = props.text;
}

async function updateElementText() {

    if (appState.value.isPending) return;
    appState.value.isPending = true;

    if (props.store === 'items') {
        await updateItem(props.itemId, 'text', editItemText.value);
    } else if (props.store === 'lists') {
        await updateList(props.itemId, 'name', editItemText.value)
    }
    drawerPosition.value = 'textVisible';
    editItemText.value = '';
    emit('refresh');
    appState.value.isPending = false;

}
</script>

<template>
    <div class="bigBox w100" :class="{ 'isImportant': element.isImportant}">
        <div class="drawer " :class="drawerPosition">
            <!-- Text box -->
            <div class="box text flex" :class="{ 'rowReverse' : appState.leftHand}">
                <!-- <svg name="imortant" v-if="element.isImportant" viewBox="0 -960 960 960" @click.stop="toggleIsImportant"
                    class="icon fill_important">
                    <path
                        d="M480-79q-16 0-30.5-6T423-102L102-423q-11-12-17-26.5T79-480q0-16 6-31t17-26l321-321q12-12 26.5-17.5T480-881q16 0 31 5.5t26 17.5l321 321q12 11 17.5 26t5.5 31q0 16-5.5 30.5T858-423L537-102q-11 11-26 17t-31 6Zm0-80 321-321-321-321-321 321 321 321Zm-40-281h80v-240h-80v240Zm40 120q17 0 28.5-11.5T520-360q0-17-11.5-28.5T480-400q-17 0-28.5 11.5T440-360q0 17 11.5 28.5T480-320Zm0-160Z" />
                </svg> -->

                <div class="icons">
                    <svg viewBox="0 -960 960 960" class="menuIcon"
                        :class="[element.isImportant ? 'fill_important' : 'fill_gray-light']" v-if="store === 'lists'">
                        <path :d="icons[element.theme].path" />
                    </svg>

                    <svg name="imortant" viewBox="0 -960 960 960" class="menuIcon delete pointer"
                        :class="[element.isImportant ? 'fill_important' : 'fill_gray-light']"
                        v-if="store === 'items' && element.isImportant">
                        <path
                            d="M480-79q-16 0-30.5-6T423-102L102-423q-11-12-17-26.5T79-480q0-16 6-31t17-26l321-321q12-12 26.5-17.5T480-881q16 0 31 5.5t26 17.5l321 321q12 11 17.5 26t5.5 31q0 16-5.5 30.5T858-423L537-102q-11 11-26 17t-31 6Zm0-80 321-321-321-321-321 321 321 321Zm-40-281h80v-240h-80v240Zm40 120q17 0 28.5-11.5T520-360q0-17-11.5-28.5T480-400q-17 0-28.5 11.5T440-360q0 17 11.5 28.5T480-320Zm0-160Z" />
                    </svg>
                </div>

                <div class="content grow flex alignCenter" :class="{ 'justifyEnd' : appState.leftHand}">
                    <p class="maxW100">{{ text }}</p>
                </div>

                <div class="icons">
                    <svg name="menu" viewBox="0 -960 960 960" @click.stop="drawerPosition = 'menuVisible'"
                        class="menuIcon pointer">
                        <path
                            d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z" />
                    </svg>
                </div>
            </div>
            <!-- Menu box -->
            <div class="box menu flex" :class="{ 'rowReverse' : appState.leftHand}">
                <div class="content flex alignCenter grow" :class="{ 'justifyEnd': appState.leftHand }">
                    <div class="icons">
                        <!-- edit text -->
                        <svg name="edit" viewBox="0 -960 960 960" @click.stop="requestEditItem"
                            class="menuIcon edit pointer">
                            <path
                                d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                        </svg>

                        <!-- delete item -->
                        <svg name="delete" viewBox="0 -960 960 960"
                            @click.stop="menuOption = 'validation', drawerPosition = 'menuOptions'"
                            class="menuIcon delete pointer">
                            <path
                                d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                        </svg>

                        <!-- mark as important -->
                        <svg name="imortant" viewBox="0 -960 960 960" @click.stop="toggleIsImportant"
                            class="menuIcon delete pointer" :class="{ 'fill_important' : element.isImportant}">
                            <path
                                d="M480-79q-16 0-30.5-6T423-102L102-423q-11-12-17-26.5T79-480q0-16 6-31t17-26l321-321q12-12 26.5-17.5T480-881q16 0 31 5.5t26 17.5l321 321q12 11 17.5 26t5.5 31q0 16-5.5 30.5T858-423L537-102q-11 11-26 17t-31 6Zm0-80 321-321-321-321-321 321 321 321Zm-40-281h80v-240h-80v240Zm40 120q17 0 28.5-11.5T520-360q0-17-11.5-28.5T480-400q-17 0-28.5 11.5T440-360q0 17 11.5 28.5T480-320Zm0-160Z" />
                        </svg>
                    </div>
                </div>
                <!-- cancel -->
                <div class="icons">
                    <svg name="close" viewBox="0 -960 960 960" @click.stop="drawerPosition='textVisible'"
                        class=" pointer menuIcon">
                        <path
                            d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                    </svg>
                </div>
            </div>
            <!-- Menu Options box -->
            <div class="box options w100">
                <!-- confirmation box -->
                <div class="h100 validation flex" :class="{ 'rowReverse': appState.leftHand }"
                    v-if="menuOption === 'validation'">
                    <div class="content flex alignCenter grow" :class="{ 'justifyEnd': appState.leftHand }">
                        <p class="maxW100">action validation</p>
                    </div>

                    <div class="icons flex">
                        <!-- confirm delete item-->
                        <svg name="check" viewBox="0 -960 960 960" @click.stop="requestDeleteItem"
                            class="pointer menuIcon">
                            <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                        </svg>
                        <!-- cancel delete item-->
                        <svg name="close" viewBox="0 -960 960 960" @click.stop="drawerPosition = 'menuVisible'"
                            class="pointer menuIcon">
                            <path
                                d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                        </svg>
                    </div>
                </div>
                <!-- edition box -->
                <div class="h100 edition flex" :class="{ 'rowReverse': appState.leftHand }"
                    v-if="menuOption === 'edition'" @click.stop>
                    <div class="content flex alignCenter grow" :class="{ 'justifyEnd': appState.leftHand }">
                        <input type="text" v-model="editItemText" v-focus>
                    </div>

                    <div class="icons">
                        <svg name="check" viewBox="0 -960 960 960" class="pointer menuIcon" @click="updateElementText">
                            <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                        </svg>

                        <svg name="close" viewBox="0 -960 960 960" @click.stop="drawerPosition = 'menuVisible'"
                            class="pointer menuIcon">
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
    --bigBox-height: 48px;
    --box-height: 46px;

    flex-shrink: 0;

    height: var(--bigBox-height);
    width: 100%;
    border: 1px solid var(--gray-light);
    border-radius: 10px;
    overflow: hidden;
    position: relative;
}
.bigBox.isImportant {
    border: 1px solid var(--important);
}
.drawer {
    width: 100%;
    position: absolute;
    top: 0px;
    left: 0;
    transition: 300ms ease;
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
.box.text,
.box.menu,
.box.options {
    flex-shrink: 0;
    height: var(--box-height);
}
.box.text {
    background-color: var(--dark);
    padding-left: 10px;
}
.box.menu {
    background-color: var(--dark);
}
.box.options .validation {
    background-color: var(--danger);
}
.box.options .edition {
    background-color: var(--success);
}
.themeIcon {
    width: 35px;
    padding: 5px;
    flex-shrink: 0;
}
.content {
    font-size: 18px;
    font-weight: 700;
    margin: 0 10px;
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow-x: scroll;
}

.icons {
    height: 46px;
    padding: 6px;
    fill: var(--gray-light);
}
.menuIcon {
    height: 100%;
    
    flex-shrink: 0;
}

</style>