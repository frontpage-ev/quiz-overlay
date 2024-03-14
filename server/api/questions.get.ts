export default defineEventHandler(async (event) => {
    const db = useDatabase()
    const result = await db.sql`SELECT q.id as id, q.text as question_text, q.correct_answer as correct_answer, a.id as answer_id, a.text as answer_text FROM questions q LEFT JOIN answers a ON q.id = a.question_id`

    const questions: any = {}
    result.rows?.forEach((row: any) => {
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

    return Object.values(questions)
})