/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const { Flags } = require('@oclif/core')
const BaseCommand = require('../../base-command')

class ListCommand extends BaseCommand {
  async run () {
    const { flags } = await this.parse(ListCommand)
    let vars = this.cliConfig.values

    if (flags.local) vars = this.cliConfig.local.values
    else if (flags.global) vars = this.cliConfig.global.values
    else if (flags.env) vars = this.cliConfig.envs

    if (flags.verbose) {
      this.log(`---- Global configuration: ${this.cliConfig.global.file}`)
      await this.printObject(this.cliConfig.global.values)

      this.log()
      this.log(`---- Local configuration: ${this.cliConfig.local.file}`)
      await this.printObject(this.cliConfig.local.values)

      this.log()
      this.log('---- Environmental Variables')
      await this.printObject(this.cliConfig.envs)

      this.log()
      this.log('---- Active Configuration')
      await this.printObject(this.cliConfig.values)
      this.log()
    } else {
      await this.printObject(vars)
    }
  }
}

ListCommand.description = 'lists all persistent config values'
ListCommand.aliases = ['config:ls']

ListCommand.flags = {
  ...BaseCommand.flags,
  env: Flags.boolean({ char: 'e', description: 'environment variables' }),
  verbose: Flags.boolean({ description: 'show all config values', exclusive: ['yaml', 'json'] }),
  json: Flags.boolean({ char: 'j', description: 'output in json', exclusive: ['yaml'], hidden: false }),
  yaml: Flags.boolean({ char: 'y', description: 'output in yaml', exclusive: ['json'], hidden: false })
}

module.exports = ListCommand
