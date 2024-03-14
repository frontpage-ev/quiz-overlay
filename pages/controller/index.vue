<template>
  <div class="h-full w-full bg-black flex flex-col pt-8 gap-12 items-center">
    <div class="w-full flex flex-col items-center">
      <NumberInput
          min="1"
          max="4"
          step="1"
          label="Anzahl Spieler"
          v-model="players"
      />

      <div class="w-full flex justify-center gap-8">
        <button
            :class="['py-5 text-center text-slate-50 text-xl font-bold rounded-2xl font-roobert select-none hover:text-indigo-300',
              currentView === 'question' ? 'text-indigo-300' : ''
            ]"
            @click="updateCurrentView('question')"
        >
          Frage zeigen
        </button>
        <button
            :class="['py-5 text-center text-slate-50 text-xl font-bold rounded-2xl font-roobert select-none hover:text-indigo-300',
              currentView === 'answer' ? 'text-indigo-300' : ''
            ]"
            @click="updateCurrentView('answer')"
        >
          Antwort zeigen
        </button>
      </div>
    </div>

    <div class="w-full flex flex-wrap justify-center gap-4">
      <div class="text-slate-50 w-full text-center font-extrabold text-2xl mb-5">
        Fragen
      </div>

      <template v-for="question in questions" v-bind:key="question">
        <ControllerQuestionPanel
            :question="question.text"
            :class="['hover:ring-2 hover:ring-indigo-200 cursor-pointer',
              currentQuestion?.id === question.id ? 'ring-2 ring-indigo-200' : ''
            ]"
            @button-click="updateCurrentQuestion(question)"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: questions } = await useFetch<Question[]>('/api/questions')
const { data: currentQuestion, refresh: refreshCurrentQuestion } = useFetch<Question>('/api/questions/current')
const { data: currentView, refresh: refreshCurrentView } = useFetch<String>('/api/view/current')

const players = ref(1)

function updateCurrentQuestion(newQuestion: Question) {
  $fetch(`/api/questions/${newQuestion.id}/current`, {
    method: 'POST'
  })
}

function updateCurrentView(newView: View) {
  $fetch(`/api/view/current`, {
    method: 'POST',
    params: {
      view: newView
    }
  })
}

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