<template>
    <button
        class="w-1/6 bg-primary py-5 text-center text-slate-50 text-xl font-bold rounded-2xl font-roobert select-none"
        @click.native="$emit('buttonClick')"
    >
      <!-- Question -->
       {{ question }}
    </button>
</template>

<script setup lang="ts">
defineProps<{
  question: string
}>()
</script>