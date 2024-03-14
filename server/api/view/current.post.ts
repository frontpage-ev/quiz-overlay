export default defineEventHandler(async (event) => {
    const storage = useStorage('file')
    const { view } = getQuery(event)

    await storage.setItem('view:current', view ?? null)

    setResponseStatus(event, 204)
})