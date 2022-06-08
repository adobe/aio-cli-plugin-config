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

class GetCommand extends BaseCommand {
  async run () {
    const { args, flags } = await this.parse(GetCommand)

    let source
    if (flags.local) source = 'local'
    else if (flags.global) source = 'global'
    else if (flags.env) source = 'env'

    const vars = this.cliConfig.get(args.key, source)

    if (vars == null || Object.keys(vars).length === 0) return

    await this.printObject(vars)
  }
}

GetCommand.description = 'gets a persistent config value'

GetCommand.flags = {
  ...BaseCommand.flags,
  env: Flags.boolean({ char: 'e', description: 'environment variables' }),
  json: Flags.boolean({ char: 'j', description: 'output in json', hidden: false, exclusive: ['yaml'] }),
  yaml: Flags.boolean({ char: 'y', description: 'output in yaml', hidden: false, exclusive: ['json'] })
}

GetCommand.args = [
  { name: 'key', required: true }
]

module.exports = GetCommand
