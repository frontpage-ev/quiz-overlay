<template>
  <div class="flex flex-col">
    <label for="input" class="text-slate-50">{{ label }}</label>
    <div class="mt-2 flex items-center">
      <button
          class="p-3 border-2 border-slate-50 rounded-l-md h-11 text-center leading-3 text-slate-50"
          @click="add(-Number(step))"
      >-</button>
      <input
          type="number"
          :min="min"
          :max="max"
          :step="step"
          name="input"
          class="remove-arrow h-11 border-0 bg-slate-500 w-full py-1.5 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-center text-slate-50"
          v-model="model"
          @input="event => event.target.reportValidity()"
      >
      <button
          class="p-3 border-2 border-slate-50 rounded-r-md h-11 text-center leading-3 text-slate-50"
          @click="add(Number(step))"
      >+</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  min: string
  max: string
  step: string
  label: string
}>()

const model = defineModel<number>()

function add(count: number) {
  if (!model.value) {
    return
  }

  const newValue = model.value + count

  if (newValue >= parseFloat(props.min) && newValue <= parseFloat(props.max)) {
    model.value = newValue
  }
}
</script>