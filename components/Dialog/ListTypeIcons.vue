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
    <fieldset>
        <legend>Select theme</legend>

        <div class="scroller flex justifyBetween gap10 marTop20">
            <DialogThemeIcon 
                v-for="icon in Object.keys(icons)" :key="icon"
                :iconId="icon"
                :active="activeTheme === icon"
                @click="handleClick(icon)" />

        </div>
    </fieldset>
</template>

<style scoped>
fieldset {
    border: none;
}
.scroller {
    display: flex;
    gap: 10px;
}

input[type="radio"] {
    opacity: 0;
    position: absolute;
    z-index: -1;
}
.iconFrame {
    overflow: visible;
}
</style>