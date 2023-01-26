#!/usr/bin/env node
const fs = require('fs')

fs.readdir(process.cwd(), async (err, filenames) => {
  if (err) {
    console.error(err)
  }

  for (let filename of filenames) {
    try {
      const stats = await lstat(filename)
      console.log(filename, 'Directory?:', stats.isDirectory())
    } catch (err) {
      console.error(err)
    }
  }
})

const lstat = (filename) => {
  return new Promise((resolve, reject) => {
    fs.lstat(filename, (err, stats) => {
      if (err) {
        reject(err)
      }
      resolve(stats)
    })
  })
}
