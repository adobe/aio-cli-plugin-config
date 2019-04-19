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
const { cli } = require('cli-ux')

class ClearCommand extends BaseCommand {
  async run() {
    const { flags } = this.parse(ClearCommand)

    if (!flags.force) {
      const confirm = await cli.prompt('are you sure? [yN]', { type: 'normal' })
      if (!confirm[0] || confirm[0].toLowerCase() !== 'y') {
        return
      }
    }

    this.cliConfig.set(null, null, !!flags.local)
  }
}

ClearCommand.description = 'clears all persistent config values'
ClearCommand.flags = {
  ...BaseCommand.flags,
  force: flags.boolean({ char: 'f', description: 'do not prompt for confirmation' })
}

module.exports = ClearCommand
