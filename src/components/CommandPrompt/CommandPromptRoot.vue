<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { DialogOverlay, DialogPortal, DialogRoot, DialogTrigger } from 'radix-vue';
import CommandPromptView from './CommandPromptView.vue';

const isOpen = ref();

const keydownHandler = (e: KeyboardEvent): void => {
    if (e.code === 'Escape') {
        e.preventDefault();
        isOpen.value = false;
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
                    <CommandPromptView />
                </div>
            </DialogOverlay>
        </DialogPortal>
    </DialogRoot>
</template>

<style scoped></style>
