<script setup>
import { ref, watch } from 'vue';

import { storeToRefs } from 'pinia';
import { useAppState } from '@/stores/appState';
const state = useAppState();
const { message } = storeToRefs(state);

const toastVisible = ref(false);

watch(
    () => message.text,
    (newVal, oldVal) => {
        if (newVal) {
            toastVisible.value = true;
            setTimeout(() => {
                toastVisible.value = false;
                // value.value.message               //     text: '',
                //     type: ''
                // };
            }, 3000);
        }
    }
);

</script>

<template>
    <div class="full absolute top0 left0 noEvents">
        <div class="toast shadow" :class="[ message.type, toastVisible ? 'visible' : 'hidden']">
            {{ message.text }}
        </div>
    </div>
</template>

<style scoped>
.toast {
    width: 90%;
    padding: 20px;
    border-radius: 10px;
    margin: 10px auto;

    
    transition: transform 0.3s ease-in-out;
}
.toast.hidden {
    transform: translateY(-150%);
}
.toast.visible {
    transform : translateY(0%);
}
.toast.success {
    background-color: var(--success);
}
.toast.warning {
    background-color: var(--warning);
}
.toast.danger {
    background-color: var(--danger);
}
</style>