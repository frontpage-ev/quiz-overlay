export default defineEventHandler(async (event) => {
    const storage = useStorage('file')
    const db = useDatabase()

    const id = await storage.getItem('question:current')

    if (id) {
        const statement = db.prepare('SELECT q.id as id, q.text as question_text, q.correct_answer as correct_answer, a.id as answer_id, a.text as answer_text FROM questions q LEFT JOIN answers a ON q.id = a.question_id WHERE q.id = ?')
        const result = await statement.all(Number(id)) as any

        if (result) {
            const questions: any = {}
            result.forEach((row: any) => {
                if (!questions[row.id]) {
                    questions[row.id] = {
                        id: row.id,
                        text: row.question_text,
                        answers: [],
                        correct_answer: row.correct_answer
                    }
                }

                questions[row.id].answers.push({
                    id: row.answer_id,
                    text: row.answer_text
                })
            })

            return Object.values(questions)[0]
        } else {
            return null
        }
    } else {
        return null
    }
})