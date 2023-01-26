#!/usr/bin/env node
const fs = require('fs')

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

fs.readdir(process.cwd(), async (err, filenames) => {
  if (err) {
    console.error(err)
  }

  const statPromises = filenames.map((filename) => lstat(filename))

  const allStats = await Promise.all(statPromises)

  for (const stats of allStats) {
    const index = allStats.indexOf(stats)
    console.log(filenames[index], stats.isFile())
  }
})
