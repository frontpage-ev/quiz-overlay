export default defineNitroPlugin(async () => {
    const db = useDatabase()

    await db.sql`CREATE TABLE IF NOT EXISTS questions ("id" INTEGER PRIMARY KEY AUTOINCREMENT, "text" TEXT NOT NULL, "correct_answer" TEXT NOT NULL)`
    await db.sql`CREATE TABLE IF NOT EXISTS answers ("id" INTEGER NOT NULL, "question_id" INTEGER NOT NULL, "text" TEXT NOT NULL, PRIMARY KEY (id, question_id))`
})