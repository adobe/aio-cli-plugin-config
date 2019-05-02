<!--
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
-->

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@adobe/aio-cli-plugin-config.svg)](https://npmjs.org/package/@adobe/aio-cli-plugin-config)
[![Downloads/week](https://img.shields.io/npm/dw/@adobe/aio-cli-plugin-config.svg)](https://npmjs.org/package/@adobe/aio-cli-plugin-config)
[![Build Status](https://travis-ci.org/adobe/aio-cli-plugin-config.svg?branch=master)](https://travis-ci.org/adobe/aio-cli-plugin-config)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0) [![Greenkeeper badge](https://badges.greenkeeper.io/adobe/aio-cli-plugin-config.svg)](https://greenkeeper.io/)
[![Codecov Coverage](https://img.shields.io/codecov/c/github/adobe/aio-cli-plugin-config/master.svg?style=flat-square)](https://codecov.io/gh/adobe/aio-cli-plugin-config/)


aio-cli-plugin-config
=====================

Config Plugin for the Adobe I/O CLI

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @adobe/aio-cli-plugin-config
$ ./bin/run COMMAND
running command...
$ ./bin/run (-v|--version|version)
@adobe/aio-cli-plugin-config/1.0.7 darwin-x64 node-v8.15.1
$ ./bin/run --help [COMMAND]
USAGE
  $ ./bin/run COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`./bin/run config`](#binrun-config)
* [`./bin/run config:clear`](#binrun-configclear)
* [`./bin/run config:delete KEYS...`](#binrun-configdelete-keys)
* [`./bin/run config:edit`](#binrun-configedit)
* [`./bin/run config:get KEY`](#binrun-configget-key)
* [`./bin/run config:list`](#binrun-configlist)
* [`./bin/run config set key 'a value'       # set key to 'a value'`](#binrun-config-set-key-a-value--------set-key-to-a-value)

## `./bin/run config`

list, get, set, delete, and edit persistent configuration data

```
USAGE
  $ ./bin/run config

OPTIONS
  -e, --env     environment variables
  -g, --global  global config
  -j, --json    output in json
  -l, --local   local config
  -y, --yaml    output in yaml
  --verbose     show all config values

ALIASES
  $ ./bin/run config:ls

EXAMPLES
  $ aio config:list
  $ aio config:get KEY
  $ aio config:set KEY VALUE
  $ aio config:delete KEY
  $ aio config:clear
```

_See code: [src/commands/config/index.js](https://github.com/adobe/aio-cli-plugin-config/blob/v1.0.7/src/commands/config/index.js)_

## `./bin/run config:clear`

clears all persistent config values

```
USAGE
  $ ./bin/run config:clear

OPTIONS
  -f, --force   do not prompt for confirmation
  -g, --global  global config
  -l, --local   local config
```

_See code: [src/commands/config/clear.js](https://github.com/adobe/aio-cli-plugin-config/blob/v1.0.7/src/commands/config/clear.js)_

## `./bin/run config:delete KEYS...`

deletes persistent config values

```
USAGE
  $ ./bin/run config:delete KEYS...

OPTIONS
  -g, --global  global config
  -l, --local   local config

ALIASES
  $ ./bin/run config:del
  $ ./bin/run config:rm
```

_See code: [src/commands/config/delete.js](https://github.com/adobe/aio-cli-plugin-config/blob/v1.0.7/src/commands/config/delete.js)_

## `./bin/run config:edit`

edit config file

```
USAGE
  $ ./bin/run config:edit

OPTIONS
  -g, --global  global config
  -l, --local   local config
```

_See code: [src/commands/config/edit.js](https://github.com/adobe/aio-cli-plugin-config/blob/v1.0.7/src/commands/config/edit.js)_

## `./bin/run config:get KEY`

gets a persistent config value

```
USAGE
  $ ./bin/run config:get KEY

OPTIONS
  -e, --env     environment variables
  -g, --global  global config
  -j, --json    output in json
  -l, --local   local config
  -y, --yaml    output in yaml
```

_See code: [src/commands/config/get.js](https://github.com/adobe/aio-cli-plugin-config/blob/v1.0.7/src/commands/config/get.js)_

## `./bin/run config:list`

lists all persistent config values

```
USAGE
  $ ./bin/run config:list

OPTIONS
  -e, --env     environment variables
  -g, --global  global config
  -j, --json    output in json
  -l, --local   local config
  -y, --yaml    output in yaml
  --verbose     show all config values

ALIASES
  $ ./bin/run config:ls
```

_See code: [src/commands/config/list.js](https://github.com/adobe/aio-cli-plugin-config/blob/v1.0.7/src/commands/config/list.js)_

## `./bin/run config set key 'a value'       # set key to 'a value'`

sets a persistent config value

```
USAGE
  $ ./bin/run config set key 'a value'       # set key to 'a value'
  $ ./bin/run config set key -f value.json   # set key to the json found in the file value.json
  $ ./bin/run config set -j key < value.json # set key to the json found in the file value.json

OPTIONS
  -f, --file         value is a path to a file
  -g, --global       global config
  -i, --interactive  prompt for value
  -j, --json         value is json
  -l, --local        local config
  -y, --yaml         value is yaml
```

_See code: [src/commands/config/set.js](https://github.com/adobe/aio-cli-plugin-config/blob/v1.0.7/src/commands/config/set.js)_
<!-- commandsstop -->
