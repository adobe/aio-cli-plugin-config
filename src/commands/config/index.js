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

const ListCommand = require('./list')

class ConfigCommand extends ListCommand { }

ConfigCommand.description = 'list, get, set, delete, and edit persistent configuration data'

ConfigCommand.examples = [
  '$ aio config:list',
  '$ aio config:get KEY',
  '$ aio config:set KEY VALUE',
  '$ aio config:delete KEY',
  '$ aio config:clear'
]

ConfigCommand.flags = ListCommand.flags

module.exports = ConfigCommand
