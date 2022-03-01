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

const TheCommand = require('../../../src/commands/config/set.js')
const config = require('@adobe/aio-lib-core-config')
const path = require('path')
const { mockSet } = require('@adobe/aio-lib-core-config/src/Config')

const { CliUx: { ux: cli } } = require('@oclif/core')
jest.mock('@oclif/core', () => {
  return {
    ...jest.requireActual('@oclif/core'),
    CliUx: {
      ux: {
        cli: {
          prompt: jest.fn()
        }
      }
    }
  }
})

describe('set', () => {
  let command

  beforeEach(() => {
    command = new TheCommand([])
    mockSet.mockImplementation(() => { return { a: 12 } })
  })

  afterEach(() => {
    mockSet.mockClear()
  })

  test('flags', () => {
    expect(Object.keys(TheCommand.flags)).toEqual(['local', 'global', 'json', 'yaml', 'file', 'interactive'])
  })

  test('default', async () => {
    command.argv = ['a-key', 'value']
    await expect(command.run()).resolves.not.toThrowError()
    expect(mockSet).toHaveBeenCalledWith('a-key', 'value', false)
  })

  test('local', async () => {
    command.argv = ['-l', 'a-key', 'value']
    await expect(command.run()).resolves.not.toThrowError()
    expect(mockSet).toHaveBeenCalledWith('a-key', 'value', true)
  })

  test('global', async () => {
    command.argv = ['-g', 'a-key', 'value']
    await expect(command.run()).resolves.not.toThrowError()
    expect(mockSet).toHaveBeenCalledWith('a-key', 'value', false)
  })

  test('no value', async () => {
    command.argv = ['a-key']
    await expect(command.run()).rejects.toEqual(new Error('Missing value'))
  })

  test('get piped data', async () => {
    config.getPipedData.mockResolvedValue('a file')

    command.argv = ['-g', 'a-key']
    await expect(command.run()).resolves.not.toThrowError()

    expect(config.getPipedData).toHaveBeenCalledWith()
    expect(mockSet).toHaveBeenCalledWith('a-key', 'a file', false)
  })

  test('parse key=value', async () => {
    command.argv = ['a-key=value']
    await expect(command.run()).resolves.not.toThrowError()
    expect(mockSet).toHaveBeenCalledWith('a-key', 'value', false)
  })

  test('parse json', async () => {
    command.argv = ['a-key', '-j', '{a:1}']
    await expect(command.run()).resolves.not.toThrowError()
    expect(mockSet).toHaveBeenCalledWith('a-key', { a: 1 }, false)
  })

  test('throw error on bad yaml parsing', async () => {
    command.argv = ['a-key', '-y', 'a:\nhy    ']
    await expect(command.run()).rejects.toEqual(new Error('Cannot parse yaml'))
  })

  test('throw error on bad json parsing', async () => {
    command.argv = ['a-key', '-j', '{a:1\n']
    await expect(command.run()).rejects.toEqual(new Error('Cannot parse json'))
  })

  test('parse yaml', async () => {
    command.argv = ['a-key', '-y', 'a:\n  b: true']
    await expect(command.run()).resolves.not.toThrowError()
    expect(mockSet).toHaveBeenCalledWith('a-key', { a: { b: true } }, false)
  })

  test('json file', async () => {
    command.argv = ['a-key', '-f', './test/__fixtures__/a.json']
    await expect(command.run()).resolves.not.toThrowError()
    expect(mockSet).toHaveBeenCalledWith('a-key', { a: 12 }, false)
  })

  test('yaml file', async () => {
    command.argv = ['a-key', '-f', './test/__fixtures__/a.yaml']
    await expect(command.run()).resolves.not.toThrowError()
    expect(mockSet).toHaveBeenCalledWith('a-key', { a: { b: 12 } }, false)
  })

  test('yml file', async () => {
    command.argv = ['a-key', '-f', './test/__fixtures__/a.yml']
    await expect(command.run()).resolves.not.toThrowError()
    expect(mockSet).toHaveBeenCalledWith('a-key', { a: { b: 12 } }, false)
  })

  test('other file', async () => {
    command.argv = ['a-key', '-f', './test/__fixtures__/a.txt']
    await expect(command.run()).resolves.not.toThrowError()
    expect(mockSet).toHaveBeenCalledWith('a-key', 'raw data', false)
  })

  test('file but no value', async () => {
    command.argv = ['a-key', '-f']
    await expect(command.run()).rejects.toEqual(new Error('Missing filename'))
  })

  test('file but not exists', async () => {
    command.argv = ['a-key', '-f', '/doesnotexist']
    await expect(command.run()).rejects.toEqual(new Error(`Cannot read file: ${path.resolve('/doesnotexist')}`))
  })

  test('prompt for value', async () => {
    config.getPipedData.mockResolvedValue(null)
    cli.prompt = jest.fn(() => 'a value')

    command.argv = ['a-key', '-i']
    await expect(command.run()).resolves.not.toThrowError()
    expect(mockSet).toHaveBeenCalledWith('a-key', 'a value', false)
  })
})
