import fs from 'fs'

interface Buffer {
  id?: string | null
  start?: string | null
  end?: string | null
  content: string[]
}

const argvs = process.argv.slice(2)
const input = argvs[0]
if (!input) throw new Error('You should set an input path')

const output = argvs[1] || 'subtitle.json'

/**
 * yarn ts-node scripts/srt-to-json.ts INPUT.srt OUTPUT.json
 */
fs.readFile(input, function (error, data) {
  if (error) throw error

  const text = data.toString()
  const lines = text.split('\n')

  const res: Buffer[] = []
  const buffer: Buffer = {
    id: null,
    start: null,
    end: null,
    content: [],
  }

  const reset = () => {
    buffer.id = null
    buffer.start = null
    buffer.end = null
    buffer.content = []
  }

  lines.forEach((line) => {
    if (!buffer.id) {
      buffer.id = line
    } else if (!buffer.start) {
      var range = line.split(' --> ')
      buffer.start = range[0]
      buffer.end = range[1]
    } else if (line !== '') {
      buffer.content.push(line)
    } else {
      res.push({ ...buffer })
      reset()
    }
  })

  fs.writeFileSync(output, JSON.stringify(res))
})
