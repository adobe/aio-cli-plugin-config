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
[![Node.js CI](https://github.com/adobe/aio-cli-plugin-config/actions/workflows/node.js.yml/badge.svg)](https://github.com/adobe/aio-cli-plugin-config/actions/workflows/node.js.yml)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0) 
[![Codecov Coverage](https://img.shields.io/codecov/c/github/adobe/aio-cli-plugin-config/master.svg?style=flat-square)](https://codecov.io/gh/adobe/aio-cli-plugin-config/)


aio-cli-plugin-config
=====================

Config Plugin for the Adobe I/O CLI

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
```
$ aio plugins:install -g @adobe/aio-cli-plugin-config
$ # OR
$ aio discover -i
$ aio config --help...
```

# Commands
<!-- commands -->
* [`aio config`](#aio-config)
* [`aio config clear`](#aio-config-clear)
* [`aio config del KEYS...`](#aio-config-del-keys)
* [`aio config delete KEYS...`](#aio-config-delete-keys)
* [`aio config edit`](#aio-config-edit)
* [`aio config get KEY`](#aio-config-get-key)
* [`aio config list`](#aio-config-list)
* [`aio config ls`](#aio-config-ls)
* [`aio config rm KEYS...`](#aio-config-rm-keys)
* [`aio config set key 'a value'       # set key to 'a value'`](#aio-config-set-key-a-value--------set-key-to-a-value)

## `aio config`

list, get, set, delete, and edit persistent configuration data

```
USAGE
  $ aio config [-l | -g] [-e] [--verbose |  | [-j | -y]]

FLAGS
  -e, --env     environment variables
  -g, --global  global config
  -j, --json    output in json
  -l, --local   local config
  -y, --yaml    output in yaml
  --verbose     show all config values

DESCRIPTION
  list, get, set, delete, and edit persistent configuration data

ALIASES
  $ aio config ls

EXAMPLES
  $ aio config:list

  $ aio config:get KEY

  $ aio config:set KEY VALUE

  $ aio config:delete KEY

  $ aio config:clear
```

_See code: [src/commands/config/index.ts](https://github.com/adobe/aio-cli-plugin-config/blob/5.0.0/src/commands/config/index.ts)_

## `aio config clear`

clears all persistent config values

```
USAGE
  $ aio config clear [-l | -g] [-f]

FLAGS
  -f, --force   do not prompt for confirmation
  -g, --global  global config
  -l, --local   local config

DESCRIPTION
  clears all persistent config values
```

_See code: [src/commands/config/clear.ts](https://github.com/adobe/aio-cli-plugin-config/blob/5.0.0/src/commands/config/clear.ts)_

## `aio config del KEYS...`

deletes persistent config values

```
USAGE
  $ aio config del KEYS... [-l | -g]

FLAGS
  -g, --global  global config
  -l, --local   local config

DESCRIPTION
  deletes persistent config values

ALIASES
  $ aio config del
  $ aio config rm
```

## `aio config delete KEYS...`

deletes persistent config values

```
USAGE
  $ aio config delete KEYS... [-l | -g]

FLAGS
  -g, --global  global config
  -l, --local   local config

DESCRIPTION
  deletes persistent config values

ALIASES
  $ aio config del
  $ aio config rm
```

_See code: [src/commands/config/delete.ts](https://github.com/adobe/aio-cli-plugin-config/blob/5.0.0/src/commands/config/delete.ts)_

## `aio config edit`

edit config file

```
USAGE
  $ aio config edit [-l | -g]

FLAGS
  -g, --global  global config
  -l, --local   local config

DESCRIPTION
  edit config file
```

_See code: [src/commands/config/edit.ts](https://github.com/adobe/aio-cli-plugin-config/blob/5.0.0/src/commands/config/edit.ts)_

## `aio config get KEY`

gets a persistent config value

```
USAGE
  $ aio config get KEY [-l | -g] [-j | -y] [-e]

FLAGS
  -e, --env     environment variables
  -g, --global  global config
  -j, --json    output in json
  -l, --local   local config
  -y, --yaml    output in yaml

DESCRIPTION
  gets a persistent config value
```

_See code: [src/commands/config/get.ts](https://github.com/adobe/aio-cli-plugin-config/blob/5.0.0/src/commands/config/get.ts)_

## `aio config list`

lists all persistent config values

```
USAGE
  $ aio config list [-l | -g] [-e] [--verbose |  | [-j | -y]]

FLAGS
  -e, --env     environment variables
  -g, --global  global config
  -j, --json    output in json
  -l, --local   local config
  -y, --yaml    output in yaml
  --verbose     show all config values

DESCRIPTION
  lists all persistent config values

ALIASES
  $ aio config ls
```

_See code: [src/commands/config/list.ts](https://github.com/adobe/aio-cli-plugin-config/blob/5.0.0/src/commands/config/list.ts)_

## `aio config ls`

list, get, set, delete, and edit persistent configuration data

```
USAGE
  $ aio config ls [-l | -g] [-e] [--verbose |  | [-j | -y]]

FLAGS
  -e, --env     environment variables
  -g, --global  global config
  -j, --json    output in json
  -l, --local   local config
  -y, --yaml    output in yaml
  --verbose     show all config values

DESCRIPTION
  list, get, set, delete, and edit persistent configuration data

ALIASES
  $ aio config ls

EXAMPLES
  $ aio config:list

  $ aio config:get KEY

  $ aio config:set KEY VALUE

  $ aio config:delete KEY

  $ aio config:clear
```

## `aio config rm KEYS...`

deletes persistent config values

```
USAGE
  $ aio config rm KEYS... [-l | -g]

FLAGS
  -g, --global  global config
  -l, --local   local config

DESCRIPTION
  deletes persistent config values

ALIASES
  $ aio config del
  $ aio config rm
```

## `aio config set key 'a value'       # set key to 'a value'`

sets a persistent config value

```
USAGE
  $ aio config set key 'a value'       # set key to 'a value'
  $ aio config set key -f value.json   # set key to the json found in the file value.json
  $ aio config set -j key < value.json # set key to the json found in the file value.json

FLAGS
  -f, --file         value is a path to a file
  -g, --global       global config
  -i, --interactive  prompt for value
  -j, --json         value is json
  -l, --local        local config
  -y, --yaml         value is yaml

DESCRIPTION
  sets a persistent config value
```

_See code: [src/commands/config/set.ts](https://github.com/adobe/aio-cli-plugin-config/blob/5.0.0/src/commands/config/set.ts)_
<!-- commandsstop -->
