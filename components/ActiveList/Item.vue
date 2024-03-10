<script setup>
const props = defineProps({
    item: Object
})
const menuIsOpen = ref(false)

const emit = defineEmits(['deleteItem', 'editItem']);

function deleteItem(itemId) {
    emit('deleteItem', itemId);
}
</script>


<template>
    <div class="item" :class="[menuIsOpen ? 'menuVisible' : 'textVisible']">
        <div class="slider full flex justifyEnd alignCenter text">
            <div class="grow text">
                {{ item.text }}
            </div>

            <svg class="icon pointer" viewBox="0 -960 960 960" @click="menuIsOpen = !menuIsOpen">
                <path
                    d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z" />
            </svg>
        </div>

        <div class="slider full flex alignCenter justifyEnd menu">
            <div class="grow">
                <svg class="icon edit pointer" viewBox="0 -960 960 960">
                    <path
                        d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                </svg>

                <svg class="icon delete pointer" viewBox="0 -960 960 960" @click="deleteItem(item.id)">
                    <path
                        d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                </svg>
            </div>

            <svg viewBox="0 -960 960 960" class="pointer icon" @click="menuIsOpen = !menuIsOpen">
                <path
                    d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
        </div>
    </div>

</template>

<style scoped>
.item {
    height: 48px;
    
    border: 1px solid var(--gray-light);
    border-radius: 10px;
    margin-block: 8px;
    overflow: hidden;
}
.slider {
    padding-left: 15px;
    transition: 300ms ease;
}
.textVisible .slider{
    transform: translateY(0);
}
.menuVisible .slider {
    transform: translateY(-100%);
}
.slider.menu {
    background-color: var(--dark);
}
.text {
    font-size: 21px;
    font-weight: 700;
    color: var(--graylight);
}
.icon {
    width: 48px;
    height: 30px;
    flex-shrink: 0;
}
</style>