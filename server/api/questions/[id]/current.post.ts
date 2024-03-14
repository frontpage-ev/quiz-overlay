export default defineEventHandler(async (event) => {
    const storage = useStorage('file')
    const db = useDatabase()

    const id = getRouterParam(event, 'id')

    if (id) {
        const statement = db.prepare('SELECT EXISTS(SELECT id FROM questions WHERE id = ?) as `exists`')
        let { exists } = await statement.get(Number(id)) as any

        exists = exists === 1
        setResponseStatus(event, exists ? 202 : 404)

        if (exists) {
            await storage.setItem('question:current', id)
        }
    } else {
        setResponseStatus(event, 400)
    }
})