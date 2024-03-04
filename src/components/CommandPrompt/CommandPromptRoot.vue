<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { DialogOverlay, DialogPortal, DialogRoot, DialogTrigger } from 'radix-vue';
import CommandPromptView from './CommandPromptView.vue';

const isOpen = ref();

const close = (): void => {
    isOpen.value = false;
};

const keydownHandler = (e: KeyboardEvent): void => {
    if (e.code === 'Escape') {
        e.preventDefault();
        close();
        return;
    }
    if ((e.ctrlKey || e.metaKey) && e.code === 'KeyK') {
        e.preventDefault();
        isOpen.value = !isOpen.value;
    }
};

onMounted(() => {
    window.addEventListener('keydown', keydownHandler);
});

onUnmounted(() => {
    window.removeEventListener('keydown', keydownHandler);
});
</script>

<template>
    <DialogRoot v-model:open="isOpen">
        <DialogTrigger class="font-semibold">Open prompt</DialogTrigger>
        <DialogPortal>
            <DialogOverlay>
                <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div class="fixed inset-0" @click="close" />
                    <CommandPromptView />
                </div>
            </DialogOverlay>
        </DialogPortal>
    </DialogRoot>
</template>

<style scoped></style>
