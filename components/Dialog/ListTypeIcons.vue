<script setup>
import icons from '@/assets/icons.json';

const emit = defineEmits(['selectTheme']);

const activeTheme = ref('');

function handleClick(themeId) {
    activeTheme.value = themeId
    emit('selectTheme', activeTheme.value);
}


// Mouse scroll left and right
let isDown = ref(false);
let startX = ref(0);
let scrollLeft = ref(0);

const mousedown = (e) => {
    isDown.value = true;
    startX.value = e.pageX - e.currentTarget.offsetLeft;
    scrollLeft.value = e.currentTarget.scrollLeft;
};

const endScroll = () => {
    isDown.value = false;
};

const mousemove = (e) => {
    if (!isDown.value) return;
    e.preventDefault();
    const x = e.pageX - e.currentTarget.offsetLeft;
    const walk = (x - startX.value) * 3; //scroll-fast
    e.currentTarget.scrollLeft = scrollLeft.value - walk;
};
</script>

<template>
    <div class="box w100">
        <p>Thème de la liste</p>

        <div class="scroller deepField w100 flex justifyBetween gap10 marTop20" @mousedown="mousedown"
            @mouseleave="endScroll" @mouseup="endScroll" @mousemove="mousemove">
            <DialogThemeIcon v-for="icon in Object.keys(icons)" :key="icon" :iconId="icon"
                :active="activeTheme === icon" @click="handleClick(icon)" class="themeIcon" border />

        </div>
    </div>
</template>

<style scoped>
.box {
    border: none;
}
.scroller {
    padding: 10px;
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