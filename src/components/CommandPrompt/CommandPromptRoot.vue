<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, type Ref } from 'vue';
import { DialogOverlay, DialogPortal, DialogRoot, DialogTrigger } from 'radix-vue';
import CommandPromptView from './CommandPromptView.vue';

const isOpen = ref(true);
const inputRef: Ref<HTMLInputElement | null> = ref(null);

const keydownHandler = (e: KeyboardEvent): void => {
    if ((e.ctrlKey || e.metaKey) && e.code === 'KeyK') {
        e.preventDefault();
        isOpen.value = !isOpen.value;
        if (isOpen.value) {
            nextTick(() => {
                inputRef.value!.focus();
            });
        }
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
        <DialogTrigger class="font-semibold"> Edit profile </DialogTrigger>
        <DialogPortal>
            <DialogOverlay
                class="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] z-[100] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none" />
            <CommandPromptView />
        </DialogPortal>
    </DialogRoot>
</template>

<style scoped></style>
