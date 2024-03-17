<script setup>
const appState = useAppState();

const toastVisible = ref(false);

watch(
    () => appState.value.message.text,
    (newVal, oldVal) => {
        if (newVal) {
            toastVisible.value = true;
            setTimeout(() => {
                toastVisible.value = false;
                // appState.value.message = {
                //     text: '',
                //     type: ''
                // };
            }, 3000);
        }
    }
);

</script>

<template>
    <div class="full absolute top0 left0 noEvents">
        <div class="toast shadow" :class="[ appState.message.type, toastVisible ? 'visible' : 'hidden']">
            {{ appState.message.text }}
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