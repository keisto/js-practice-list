#!/usr/bin/env node
const fs = require('fs')
const chalk = require('chalk')

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

    if (stats.isFile()) {
      console.log(filenames[index])
    } else {
      console.log(chalk.bold(filenames[index]))
    }
  }
})
