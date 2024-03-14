interface Question {
    id: number
    text: string
    answers: Answer[]
    correct_answer: string
}

interface Answer {
    id: number
    text: string
}