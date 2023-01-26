#!/usr/bin/env node
const fs = require('fs')

fs.readdir(process.cwd(), (err, filenames) => {
  if (err) {
    console.error(err)
  }

  const allStats = Array(filenames.length).fill(null)

  for (let filename of filenames) {
    const index = filenames.indexOf(filename)

    fs.lstat(filename, (err, stats) => {
      if (err) {
        console.error(err)
      }

      allStats[index] = stats

      const ready = allStats.every((stats) => !!stats)

      if (ready) {
        allStats.forEach((stats, index) => {
          console.log(filenames[index], stats.isFile())
        })
      }
    })
  }
})
