const { stdout } = require('stdout-stderr')

jest.setTimeout(30000)
jest.useFakeTimers()

// trap console log
beforeEach(() => { stdout.start() })
afterEach(() => { stdout.stop() })
