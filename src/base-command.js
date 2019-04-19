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

const { Command, flags } = require('@oclif/command')
const Config = require('aio-cli-config/lib/Config')
const hjson = require('hjson')

class BaseCommand extends Command {
  get cliConfig() {
    if (!this._config) this._config = new Config(this.debug)
    return this._config
  }

  printObject(obj) {
    if (obj != null) {
      if (typeof obj !== 'object') {
        this.log(obj)
      } else if (Object.keys(obj).length !== 0) {
        // this.log(yaml.safeDump(obj, { sortKeys: true, lineWidth: 256, noCompatMode: true }).trim())
        this.log(hjson.stringify(obj, {
          condense: true,
          emitRootBraces: false,
          separator: true,
          bracesSameLine: true,
          multiline: 'off',
          colors: false }))
      }
    }
  }
}

BaseCommand.flags = {
  local: flags.boolean({ char: 'l', description: 'local config', exclusive: ['global'] }),
  global: flags.boolean({ char: 'g', description: 'global config', exclusive: ['local'] })
}

module.exports = BaseCommand
