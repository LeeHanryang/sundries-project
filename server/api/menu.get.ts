// server/api/menu.get.ts
import { promises as fs } from 'fs'
import { join } from 'path'

export default defineEventHandler(async () => {
  const file = join(process.cwd(), 'data', 'menu.json')
  const content = await fs.readFile(file, 'utf-8')
  return JSON.parse(content)
})
