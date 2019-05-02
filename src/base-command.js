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
const Config = require('@adobe/aio-cli-config/src/Config')
const hjson = require('hjson')
const yaml = require('js-yaml')

class BaseCommand extends Command {
  get cliConfig() {
    if (!this._config) {
      this._config = new Config()
      this._config.reload()
    }
    return this._config
  }

  printObject(obj) {
    const { flags } = this.parse(this.constructor)

    let format = 'hjson'
    if (flags.yaml) format = 'yaml'
    else if (flags.json) format = 'json'

    const print = (obj) => {
      if (format === 'json') {
        this.log(JSON.stringify(obj))
      } else if (format === 'yaml') {
        this.log(yaml.safeDump(obj, { sortKeys: true, lineWidth: 1024, noCompatMode: true }))
      } else {
        if (typeof obj !== 'object') {
          this.log(obj)
        } else if (Object.keys(obj).length !== 0) {
          this.log(hjson.stringify(obj, {
            condense: true,
            emitRootBraces: true,
            separator: true,
            bracesSameLine: true,
            multiline: 'off',
            colors: false }))
        }
      }
    }

    if (obj != null) {
      print(obj)
    }
  }
}

BaseCommand.flags = {
  local: flags.boolean({ char: 'l', description: 'local config', exclusive: ['global'] }),
  global: flags.boolean({ char: 'g', description: 'global config', exclusive: ['local'] }),
  json: flags.boolean({ char: 'j', hidden: true, exclusive: ['yaml'] }),
  yaml: flags.boolean({ char: 'y', hidden: true, exclusive: ['json'] })
}

module.exports = BaseCommand
