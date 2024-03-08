<script setup>
import icons from '@/assets/icons.json';
const props = defineProps({
    iconId: String,
    active: Boolean,
    border: {
        type: Boolean,
        default: false
    }
})

</script>

<template>
    <svg viewBox="0 -960 960 960" class="themeIcon pointer"
    :class="{ 'active' : active }">

        <path :d="icons[iconId].path" />
    </svg>
</template>

<style scoped>
.themeIcon {
    width: 48px;
    height: 48px;
    padding: 6px;
    fill: var(--gray-light);
    border: 1px solid var(--gray-light);
    border-radius: 5px;
}
.themeIcon:hover,
.themeIcon.active {
    fill: var(--color);
    border: 1px solid var(--color);
    outline: 2px solid var(--color);
}

</style>