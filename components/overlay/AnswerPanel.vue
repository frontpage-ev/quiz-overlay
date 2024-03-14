<template>
  <div class="flex flex-col gap-2 w-full items-center font-roobert">
    <div class="w-2/3 bg-primary py-5 text-center text-slate-50 text-4xl font-bold rounded-2xl">
      <!-- Answer -->
       {{ answer }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  answer: string
}>()
</script>