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
[![Build status](https://ci.appveyor.com/api/projects/status/1pimm457lov4f1vr/branch/master?svg=true)](https://ci.appveyor.com/project/shazron/aio-cli-plugin-config/branch/master) [![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0) [![Greenkeeper badge](https://badges.greenkeeper.io/adobe/aio-cli-plugin-config.svg)](https://greenkeeper.io/)


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
@adobe/aio-cli-plugin-config/1.0.7 darwin-x64 node-v8.11.4
$ ./bin/run --help [COMMAND]
USAGE
  $ ./bin/run COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`./bin/run config`](#binrun-config)
* [`./bin/run config:clear [KEY]`](#binrun-configclear-key)
* [`./bin/run config:delete [KEY]`](#binrun-configdelete-key)
* [`./bin/run config:get [KEY]`](#binrun-configget-key)
* [`./bin/run config:set [KEY] [VALUE]`](#binrun-configset-key-value)

## `./bin/run config`

get, set, delete, and clear persistent configuration data

```
USAGE
  $ ./bin/run config

EXAMPLES
  $ aio config:get KEY
  $ aio config:set KEY VALUE
  $ aio config:delete KEY
  $ aio config:del KEY
  $ aio config:clear
```

_See code: [src/commands/config/index.js](https://github.com/adobe/aio-cli-plugin-config/blob/v1.0.7/src/commands/config/index.js)_

## `./bin/run config:clear [KEY]`

clears all persistent config values, or for a specific key

```
USAGE
  $ ./bin/run config:clear [KEY]
```

_See code: [src/commands/config/clear.js](https://github.com/adobe/aio-cli-plugin-config/blob/v1.0.7/src/commands/config/clear.js)_

## `./bin/run config:delete [KEY]`

delete a persistent config value

```
USAGE
  $ ./bin/run config:delete [KEY]

ALIASES
  $ ./bin/run config:del
```

_See code: [src/commands/config/delete.js](https://github.com/adobe/aio-cli-plugin-config/blob/v1.0.7/src/commands/config/delete.js)_

## `./bin/run config:get [KEY]`

gets a persistent config value

```
USAGE
  $ ./bin/run config:get [KEY]
```

_See code: [src/commands/config/get.js](https://github.com/adobe/aio-cli-plugin-config/blob/v1.0.7/src/commands/config/get.js)_

## `./bin/run config:set [KEY] [VALUE]`

sets a persistent configuration value

```
USAGE
  $ ./bin/run config:set [KEY] [VALUE]

OPTIONS
  -f, --file                 the value is a path to a file to read the config value from

  -t, --mime-type=mime-type  the mime-type of the file path with --file/-f (defaults to plain text, available:
                             application/json)
```

_See code: [src/commands/config/set.js](https://github.com/adobe/aio-cli-plugin-config/blob/v1.0.7/src/commands/config/set.js)_
<!-- commandsstop -->
