<script setup>
const appState = useAppState();

function toggleHandPreference() {
    if (appState.value.leftHand) {
        appState.value.leftHand = false;
    } else {
        appState.value.leftHand = true;
    }

    console.log(appState.value.leftHand);
}
</script>

<template>
    <div class="box flex gap10">
        <svg name="touch" viewBox="0 -960 960 960" class="touchIcon flipped pointer"
            :class="{ 'active': appState.leftHand }" @click="toggleHandPreference">
            <path
                d="M419-80q-28 0-52.5-12T325-126L107-403l19-20q20-21 48-25t52 11l74 45v-328q0-17 11.5-28.5T340-760q17 0 29 11.5t12 28.5v472l-97-60 104 133q6 7 14 11t17 4h221q33 0 56.5-23.5T720-240v-160q0-17-11.5-28.5T680-440H461v-80h219q50 0 85 35t35 85v160q0 66-47 113T640-80H419ZM167-620q-13-22-20-47.5t-7-52.5q0-83 58.5-141.5T340-920q83 0 141.5 58.5T540-720q0 27-7 52.5T513-620l-69-40q8-14 12-28.5t4-31.5q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 17 4 31.5t12 28.5l-69 40Zm335 280Z" />
        </svg>

        <svg name="touch" viewBox="0 -960 960 960" class="touchIcon pointer"
            :class="{ 'active' : !appState.leftHand }" @click="toggleHandPreference">
            <path
                d="M419-80q-28 0-52.5-12T325-126L107-403l19-20q20-21 48-25t52 11l74 45v-328q0-17 11.5-28.5T340-760q17 0 29 11.5t12 28.5v472l-97-60 104 133q6 7 14 11t17 4h221q33 0 56.5-23.5T720-240v-160q0-17-11.5-28.5T680-440H461v-80h219q50 0 85 35t35 85v160q0 66-47 113T640-80H419ZM167-620q-13-22-20-47.5t-7-52.5q0-83 58.5-141.5T340-920q83 0 141.5 58.5T540-720q0 27-7 52.5T513-620l-69-40q8-14 12-28.5t4-31.5q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 17 4 31.5t12 28.5l-69 40Zm335 280Z" />
        </svg>
    </div>
</template>

<style scoped>
.touchIcon {
    width: 30px;
    fill: var(--gray-light);
}
.touchIcon.flipped {
    transform: scaleX(-1);
}
.touchIcon.active {
    fill: var(--important);
}
</style>