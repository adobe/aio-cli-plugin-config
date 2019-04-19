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

const child_process = require('child_process')
const BaseCommand = require('../../base-command')

class EditCommand extends BaseCommand {
  async run() {
    let { flags } = this.parse(EditCommand)

    let file = (flags.local) ? this.cliConfig.local.file : this.cliConfig.global.file

    let cmd = (process.platform === 'win32') ? `${process.env['EDITOR'] || 'notepad'}` : `${process.env['EDITOR'] || 'vi'}`
    child_process.spawn(cmd, [ file ], {
      stdio: 'inherit',
      detached: true
    })
  }
}

EditCommand.description = 'edit config file'
EditCommand.flags = BaseCommand.flags

module.exports = EditCommand
