const { stdout } = require('stdout-stderr')

process.on('unhandledRejection', console.error)

// trap console log
beforeEach(() => { stdout.start() })
afterEach(() => { stdout.stop() })
