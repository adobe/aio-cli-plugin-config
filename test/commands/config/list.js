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

const { stdout } = require('stdout-stderr')
const TheCommand = require('../../../src/commands/config/list.js')
const fs = require('fs')

jest.mock('@adobe/aio-cli-config/src/Config', () => {
  return jest.fn().mockImplementation(() => {
    return {
      values: { a: 1 },
      local: { values: {} },
      global: { values: { a: 3 } },
      envs: { a: 4 },
      reload: () => true
    }
  })
})

describe('list', () => {
  test('flags', () => {
    expect(Object.keys(TheCommand.flags)).toEqual(['local', 'global', 'json', 'yaml', 'env', 'verbose'])
  })

  test('default', () => {
    return TheCommand.run([]).then(() => {
      expect(stdout.output).toMatch(/a/)
    })
  })

  test('env', () => {
    return TheCommand.run(['-e']).then(() => {
      expect(stdout.output).toMatch(/a/)
    })
  })

  test('local', () => {
    return TheCommand.run(['-l']).then(() => {
      expect(stdout.output).toMatch('')
    })
  })

  test('global', () => {
    return TheCommand.run(['-g']).then(() => {
      expect(stdout.output).toMatch(/a/)
    })
  })

  test('verbose key', () => {
    return TheCommand.run(['--verbose']).then(() => {
      expect(stdout.output.replace(/\r\n|\r/g, '\n'))
        .toEqual(fs.readFileSync('./test/__fixtures__/verbose.txt', 'utf-8')
        .replace(/\r\n|\r/g, '\n'))
    })
  })

  test('empty object', () => {
    return TheCommand.run([ '-l' ]).then(() => {
      expect(stdout.output).toEqual('')
    })
  })
})
