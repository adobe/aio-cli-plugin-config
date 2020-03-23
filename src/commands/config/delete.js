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

const BaseCommand = require('../../base-command')

class DeleteCommand extends BaseCommand {
  async run () {
    const { argv, flags } = this.parse(DeleteCommand)

    for (const arg of argv) {
      this.cliConfig.set(arg, null, !!flags.local)
    }
  }
}

DeleteCommand.description = 'deletes persistent config values'

DeleteCommand.args = [
  { name: 'keys...', required: true }
]

DeleteCommand.aliases = ['config:del', 'config:rm']
DeleteCommand.flags = BaseCommand.flags
DeleteCommand.strict = false

module.exports = DeleteCommand
