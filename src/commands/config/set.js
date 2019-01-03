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

const {Command, flags} = require('@oclif/command')
const Conf = require('conf')
const path = require('path')
const fs = require('fs')
const os = require('os')

async function processDataForMimeType(data, mimeType) {
  switch (mimeType) {
  case 'application/json':
    return JSON.parse(data)
  case 'application/x-pem-file':
    return data.split(os.EOL)
  default:
    return data
  }
}

class SetCommand extends Command {
  async run() {
    const {args, flags} = this.parse(SetCommand)
    if (!args.key || !args.value) {
      return Promise.resolve(false)
    }

    if (flags.file) {
      return this.setFromFilePath(args.key, args.value, flags['mime-type'])
      .catch(error => {
        this.error(error.message)
      })
    }

    return this.set(args.key, args.value)
  }

  async set(key, value) {
    const conf = new Conf()
    conf.set(key, value)
    return Promise.resolve(true)
  }

  async setFromFilePath(key, filePath, mimeType = 'text/plain') {
    if (!filePath) {
      return Promise.reject(new Error('Can\'t set file path: it is null or undefined.'))
    }

    const encoding = 'utf-8' // 'base64'
    const resolvedFilePath = path.resolve(process.cwd(), filePath)

    try {
      if (fs.lstatSync(resolvedFilePath).isDirectory()) {
        return Promise.reject(new Error('file path cannot be a folder.'))
      }

      let data = fs.readFileSync(resolvedFilePath, encoding)
      data = await processDataForMimeType(data, mimeType)

      const conf = new Conf()
      conf.set(key, data)
    } catch (error) {
      return Promise.reject(new Error(error.message))
    }

    return Promise.resolve(true)
  }
}

SetCommand.description = 'sets a persistent configuration value'

SetCommand.args = [
  {name: 'key'},
  {name: 'value'},
]

SetCommand.flags = {
  file: flags.boolean({char: 'f', description: 'the value is a path to a file to read the config value from'}),
  'mime-type': flags.string({char: 't', description: 'the mime-type of the file path with --file/-f (defaults to plain text, available: application/json)'}),
}

module.exports = SetCommand
