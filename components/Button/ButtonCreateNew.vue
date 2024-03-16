<script setup>
const appState = useAppState();

const emit = defineEmits(['clicked']);
</script>

<template>
    <div class="flex" :class="[!appState.leftHand ? 'justifyEnd' : 'justifyStart']">
        <button class="flex alignCenter gap10 pointer colorOnHover" @click.prevent.stop="$emit('clicked')">
            <span class="centered h100"> 
                <slot />    
            </span>

            <svg class="icon " viewBox="0 -960 960 960">
                <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
            </svg>
        </button>
    </div>
</template>

<style scoped>
button {
    max-height: 100%;
    background-color: #ffffff33;
    padding: 3px 8px 3px 15px;
    border: 1px solid var(--gray-light);
    border-radius: 100px;
    margin: 3px 3px 0 0;
}

button span {
    font-weight: 700;
}
</style>