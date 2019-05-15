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
const TheCommand = require('../../src/base-command')
const { stdout } = require('stdout-stderr')
const hjson = require('hjson')

describe('base-command', () => {
  test('exports', () => {
    expect(typeof TheCommand).toEqual('function')
    expect(TheCommand.prototype).toBeInstanceOf(Command)
  })

  test('flags', () => {
    expect(Object.keys(TheCommand.flags)).toEqual(['local', 'global', 'json', 'yaml'])
  })

  describe('setter', () => {
    let command

    beforeEach(() => {
      command = new TheCommand([], { })
    })

    describe('printObject', () => {
      test('exists', () => {
        expect(command.printObject).toBeInstanceOf(Function)
      })

      test('returns parsed value 1', () => {
        command.printObject()
        expect(stdout.output).toEqual('')
      })

      test('yaml', () => {
        command = new TheCommand(['--yaml'], { })
        command.printObject({ foo: { bar: true } })
        expect(stdout.output).toEqual('foo:\n  bar: true\n\n')
      })

      test('json', () => {
        command = new TheCommand(['--json'], { })
        command.printObject({ foo: { bar: true } })
        expect(stdout.output).toEqual('{"foo":{"bar":true}}\n')
      })

      test('returns parsed value 2', () => {
        command.printObject(1)
        expect(stdout.output).toEqual('1\n')
      })

      test('returns parsed value 3', () => {
        command.printObject('foo')
        expect(stdout.output).toEqual('foo\n')
      })

      test('returns parsed value 4', () => {
        command.printObject({ a: 1 })
        expect(hjson.parse(stdout.output)).toEqual({ a: 1 })
      })
    })

    describe('cliConfig', () => {
      test('only gets it once', () => {
        let config1 = command.cliConfig
        let config2 = command.cliConfig
        expect(config1).toBe(config2)
      })
    })
  })
})
