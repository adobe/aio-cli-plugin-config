const conf = require('@adobe/aio-cli-config')
const OldConf = require('conf')

/**
 * return parsed json if it's a string else just return the value
 *
 * @param {Object} item
 */
const toJson = (item) => {
  if (typeof item === 'string') {
    return JSON.parse(item)
  }
  return item
}

/**
 * Move 'jwt-auth' key to aio-cli-config
 *
 * @param {Function} debug
 */
const upgrade = (debug) => {
  try {
    const oldConf = new OldConf()

    let data = oldConf.get('jwt-auth')
    oldConf.clear()

    if (data == null) {
      debug('no conf data for upgrade')
      return
    }

    oldConf.set('jwt-auth-backup', data)
    conf.set('jwt-auth', toJson(data))
    debug('config upgraded')
  } catch (e) {
    debug(`upgrade failed: ${e.message}`)
  }
}

/**
 * 1. hoists variables in the ./.env file to process.env
 * 2. upgrades existing 'conf' configuration to aio-cli-config
 */
module.exports = async function() {
  upgrade(this.debug)
  conf.dotenv()
}
