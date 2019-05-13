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

const { flags } = require('@oclif/command')
const BaseCommand = require('../../base-command')
const fs = require('fs')
const yaml = require('js-yaml')
const hjson = require('hjson')
const { getPipedData } = require('@adobe/aio-cli-config')
const { cli } = require('cli-ux')
const path = require('path')

class SetCommand extends BaseCommand {
  async run() {
    const { args, flags } = this.parse(SetCommand)

    let value = args['value|filename']
    if (flags.file) {
      if (!value) {
        this.error(`Missing filename`)
      }
      try {
        value = path.resolve(value)
        if (value.match(/.ya?ml$/i)) {
          flags.yaml = !flags.json
        } else if (value.match(/.json$/i)) {
          flags.json = !flags.yaml
        }
        value = fs.readFileSync(value, 'utf-8')
      } catch (e) {
        this.error(`Cannot read file: ${value}`)
      }
    } else if (flags.interactive) {
      value = await cli.prompt('value', { type: 'normal' })
    } else if (value == null) {
      if (args.key.indexOf('=') > 0) {
        let parts = args.key.split('=')
        args.key = parts.shift()
        value = parts.join('=')
      } else {
        value = await getPipedData()
      }
    }

    try {
      if (flags.json) {
        value = hjson.parse(value)
      } else if (flags.yaml) {
        value = yaml.safeLoad(value)
      }
    } catch (e) {
      this.error(`Cannot parse ${flags.json ? 'json' : 'yaml'}`)
    }

    if (!value) {
      this.error(`Missing value`)
    }

    this.cliConfig.set(args.key, value, !!flags.local)
  }
}

SetCommand.description = 'sets a persistent config value'

SetCommand.usage = [
  'config set key \'a value\'       # set key to \'a value\'',
  'config set key -f value.json   # set key to the json found in the file value.json',
  'config set -j key < value.json # set key to the json found in the file value.json' ]

SetCommand.flags = {
  ...BaseCommand.flags,
  json: flags.boolean({ char: 'j', hidden: false, description: 'value is json' }),
  yaml: flags.boolean({ char: 'y', hidden: false, description: 'value is yaml' }),
  file: flags.boolean({ char: 'f', description: 'value is a path to a file', exclusive: ['interactive'] }),
  interactive: flags.boolean({ char: 'i', description: 'prompt for value', exclusive: ['file'] })
}

SetCommand.args = [
  { name: 'key', required: true },
  { name: 'value|filename', required: false }
]

module.exports = SetCommand
