import { exec } from 'child_process'
import fs from 'fs'
import path from 'path'

const args = process.argv.slice(2)

const FPS = 30
const FRAME_DURATION_MS = 1000 / FPS

if (!args[0]) console.log('please set a folder in params')
else {
  fs.readdir(args[0], (_, files) => {
    const frames = files.map((file) => {
      return path.extname(file) === '.png'
        ? `${args[0]}/${file.replace(' ', '\\ ')} -d ${FRAME_DURATION_MS} `
        : ''
    })

    exec(
      `img2webp ${frames.join('')} -lossy -q 90 -m 6 -o ${args[0]}/out.webp`,
      (err, stdout) => {
        if (err) {
          console.error(`exec error: ${err}`)
          return
        }

        console.log(stdout)
      },
    )
  })
}
