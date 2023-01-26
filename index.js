#!/usr/bin/env node
const fs = require('fs')
const chalk = require('chalk')
const path = require('path')

const targetDir = process.argv[2] || process.cwd()

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

fs.readdir(targetDir, async (err, filenames) => {
  if (err) {
    console.error(err)
  }

  const statPromises = filenames.map((filename) =>
    lstat(path.join(targetDir, filename))
  )

  const allStats = await Promise.all(statPromises)

  for (const stats of allStats) {
    const index = allStats.indexOf(stats)

    if (stats.isFile()) {
      console.log('📝', chalk.dim('-'), filenames[index])
    } else {
      console.log('📁', chalk.dim('-'), chalk.bold(filenames[index]))
    }
  }
})
