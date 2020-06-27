const chalk = require('chalk')
const log = console.log

module.exports = {
  getRouterPath (actionPath) {
    let paths = actionPath.split('/')
    paths[0] = 'api'
    paths[paths.length - 1] = paths[paths.length - 1].replace(/\.js$/i, '')
    return `/${paths.join('/')}`
  },

  log: {
    info () {
      log(chalk.green('[Info]'), ...arguments)
    },

    warn () {
      log(chalk.yellow('[Warn]'), ...arguments)
    },

    error () {
      log(chalk.red('[Error]'), ...arguments)
    }
  }
}
