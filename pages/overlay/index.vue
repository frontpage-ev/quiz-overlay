<template>
  <div class="h-full w-full">
    <div class="h-full flex flex-col-reverse items-center w-full">
      <template v-if="currentView === 'question' && currentQuestion">
        <div class="pb-10 w-full">
          <OverlayQuestionPanel :question="currentQuestion" />
        </div>
      </template>

      <template v-if="currentView === 'answer' && currentQuestion">
        <div class="pb-24 w-full">
          <OverlayAnswerPanel :answer="currentQuestion.correct_answer" />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: currentQuestion, refresh: refreshCurrentQuestion } = useFetch<Question>('/api/questions/current')
const { data: currentView, refresh: refreshCurrentView } = useFetch<String>('/api/view/current')

let interval = -1
onMounted(() => {
  interval = setInterval(async () => {
    await Promise.all([refreshCurrentQuestion(), refreshCurrentView()])
  }, 200)
})

onBeforeUnmount(() => {
  if (interval !== -1) {
    clearInterval(interval)
  }
})
</script>