<template>
  <div class="flex flex-col gap-8 w-full items-center font-roobert">
    <div class="w-2/3 bg-primary py-5 text-center text-slate-50 text-4xl font-bold rounded-2xl">
      <!-- Question -->
       {{ question.text }}
    </div>

    <div class="grid grid-cols-2 gap-4 place-content-stretch w-2/3">
      <!-- Possible Answers -->
      <template v-for="answer in question.answers" v-bind:key="answer.id">
        <div class="bg-primary rounded-2xl text-slate-50 text-center text-3xl font-semibold py-3">
           {{ answer.text }}
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  question: Question
}>()
</script>