<script setup>
import icons from '@/assets/icons.json';

const emit = defineEmits(['selectTheme']);

const activeTheme = ref('');

function handleClick(themeId) {
    activeTheme.value = themeId
    emit('selectTheme', activeTheme.value);
}
</script>

<template>
    <div class="box w100">
        <p>list theme</p>

        <div class="scroller w100 flex justifyBetween gap10 marTop20">
            <DialogThemeIcon 
                v-for="icon in Object.keys(icons)" :key="icon"
                :iconId="icon"
                :active="activeTheme === icon"
                @click="handleClick(icon)" 
                class="themeIcon"
                border/>

        </div>
    </div>
</template>

<style scoped>
.box {
    border: none;
}
.scroller {
    display: flex;
    gap: 10px;
    overflow-x: scroll;
}

input[type="radio"] {
    opacity: 0;
    position: absolute;
    z-index: -1;
}
.iconFrame {
    overflow: visible;
}
.themeIcon {
    flex-shrink: 0;
}
</style>