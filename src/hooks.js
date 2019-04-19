const { dotenv } = require('aio-cli-config')

/**
 * hoists variables in the ./.env file to process.env
 */
module.exports = async function() {
  dotenv(this.debug)
}
