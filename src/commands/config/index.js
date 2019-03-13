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

const { Command } = require('@oclif/command')
const GetCommand = require('./get')

class ConfigCommand extends Command {
  async run () {
    // when this is run, no params are needed
    // which is the same as `config:get` (get contents of config)
    return GetCommand.run([])
  }
}

// this is set in package.json, see https://github.com/oclif/oclif/issues/120
// if not set it will get the first (alphabetical) topic's help description
ConfigCommand.description = 'get, set, delete, and clear persistent configuration data'

ConfigCommand.examples = [
  '$ aio config:get KEY',
  '$ aio config:set KEY VALUE',
  '$ aio config:delete KEY',
  '$ aio config:del KEY',
  '$ aio config:clear'
]

module.exports = ConfigCommand
