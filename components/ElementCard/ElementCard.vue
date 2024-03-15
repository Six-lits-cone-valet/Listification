<script setup>
const drawerPosition = ref('textVisible');
const menuOption = ref('');

const props = defineProps({
    text: Object,
    store : String,
    itemId: String
});

const emit = defineEmits(['deleteItem']);

function markAsImportant(store, itemId) {
    console.log("mark as important", store, itemId);
}

</script>

<template>
    <div class="bigBox w100">
        <div class="drawer" :class="drawerPosition">
            <!-- Text box -->
            <div class="box text">
                <div class="content grow">
                    {{ text }}
                </div>

                <div class="icons">
                    <svg name="menu" viewBox="0 -960 960 960" @click.stop="drawerPosition = 'menuVisible'"
                        class="icon pointer">
                        <path
                            d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z" />
                    </svg>
                </div>
            </div>
            <!-- Menu box -->
            <div class="box menu">
                <div class="content grow">

                    <!-- edit text -->
                    <!-- <svg name="edit" 
                        viewBox="0 -960 960 960"
                        @click="menuOption = 'edition', drawerPosition = 'menuOptions'" 
                        class="icon edit pointer">
                        <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                    </svg> -->

                    <!-- delete item -->
                    <svg name="delete" viewBox="0 -960 960 960"
                        @click.stop="menuOption = 'validation', drawerPosition = 'menuOptions'"
                        class="icon delete pointer">
                        <path
                            d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                    </svg>

                    <!-- gmark as important -->
                    <svg name="imortant" viewBox="0 -960 960 960"
                        @click.stop="markAsImportant(store, itemId)" 
                        class="icon fill_important delete pointer">
                        <path d="M480-79q-16 0-30.5-6T423-102L102-423q-11-12-17-26.5T79-480q0-16 6-31t17-26l321-321q12-12 26.5-17.5T480-881q16 0 31 5.5t26 17.5l321 321q12 11 17.5 26t5.5 31q0 16-5.5 30.5T858-423L537-102q-11 11-26 17t-31 6Zm0-80 321-321-321-321-321 321 321 321Zm-40-281h80v-240h-80v240Zm40 120q17 0 28.5-11.5T520-360q0-17-11.5-28.5T480-400q-17 0-28.5 11.5T440-360q0 17 11.5 28.5T480-320Zm0-160Z" />
                    </svg>
                </div>
                <!-- cancel -->
                <div class="icons">
                    <svg name="close" viewBox="0 -960 960 960" @click.stop="drawerPosition='textVisible'"
                        class=" pointer icon">
                        <path
                            d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                    </svg>
                </div>
            </div>
            <!-- Menu Options box -->
            <div class="menuOptions h100">
                <!-- confirmation box -->
                <div class="box validation" v-if="menuOption === 'validation'">
                    <div class="content">
                        action validation
                    </div>

                    <div class="icons">
                        <!-- confirm delete item-->
                        <svg name="check" viewBox="0 -960 960 960" @click.stop="$emit('deleteItem', store, itemId)"
                            class="pointer icon">
                            <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                        </svg>
                        <!-- cancel delete item-->
                        <svg name="close" viewBox="0 -960 960 960" @click.stop="drawerPosition = 'menuVisible'"
                            class="pointer icon">
                            <path
                                d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                        </svg>
                    </div>
                </div>
                <!-- edition box -->
                <div class="box edition" v-if="menuOption === 'edition'">
                    <div class="content">
                        edit box
                    </div>

                    <div class="icons">
                        <svg name="check" viewBox="0 -960 960 960" class="pointer icon">
                            <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                        </svg>

                        <svg name="close" viewBox="0 -960 960 960" @click.stop="drawerPosition = 'menuVisible'"
                            class="pointer icon">
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

    flex-shrink: 0;

    height: var(--bigBox-height);
    width: 100%;
    border: 1px solid var(--gray-light);
    border-radius: 10px;
    overflow: hidden;
}
.drawer {
    width: 100%;
    transition: 300ms ease;
}
.drawer.textVisible {
    transform: translateY(0px);
}
.drawer.menuVisible {
    transform: translateY(calc(var(--bigBox-height) * -1));
    transition: 300ms ease;
}
.drawer.menuOptions {
    transform: translateY(calc(var(--bigBox-height) * -2));
}
.box,
.options {
    height: var(--bigBox-height);
    display: flex;
    justify-content: flex-end;
}
.box.menu {
    background-color: var(--dark);
}
.box.validation {
    background-color: var(--danger);
}
.content {
    font-size: 18px;
    font-weight: 700;
    padding-left: 20px;
    flex-grow: 1;
    display: flex;
    align-items: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.content,
.icons {
    height: 100%;
}.icon {
    width: 48px;
    height: 100%;
    padding: 9px;
}

</style>