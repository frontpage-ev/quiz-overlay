export default defineEventHandler(async (event) => {
    const storage = useStorage('file')

    return await storage.getItem('view:current')
})