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

jest.mock('../../../src/prompt', () => ({
  prompt: jest.fn()
}))
const { prompt } = require('../../../src/prompt')

describe('set', () => {
  beforeEach(() => {
    mockSet.mockImplementation(() => { return { a: 12 } })
  })

  afterEach(() => {
    mockSet.mockClear()
  })

  test('flags', () => {
    expect(Object.keys(TheCommand.flags)).toEqual(['local', 'global', 'json', 'yaml', 'file', 'interactive'])
  })

  test('default', async () => {
    await expect(TheCommand.run(['a-key', 'value'])).resolves.not.toThrow()
    expect(mockSet).toHaveBeenCalledWith('a-key', 'value', false)
  })

  test('local', async () => {
    await expect(TheCommand.run(['-l', 'a-key', 'value'])).resolves.not.toThrow()
    expect(mockSet).toHaveBeenCalledWith('a-key', 'value', true)
  })

  test('global', async () => {
    await expect(TheCommand.run(['-g', 'a-key', 'value'])).resolves.not.toThrow()
    expect(mockSet).toHaveBeenCalledWith('a-key', 'value', false)
  })

  test('no value', async () => {
    await expect(TheCommand.run(['a-key'])).rejects.toEqual(new Error('Missing value'))
  })

  test('get piped data', async () => {
    config.getPipedData.mockResolvedValue('a file')

    await expect(TheCommand.run(['-g', 'a-key'])).resolves.not.toThrow()

    expect(config.getPipedData).toHaveBeenCalledWith()
    expect(mockSet).toHaveBeenCalledWith('a-key', 'a file', false)
  })

  test('parse key=value', async () => {
    await expect(TheCommand.run(['a-key=value'])).resolves.not.toThrow()
    expect(mockSet).toHaveBeenCalledWith('a-key', 'value', false)
  })

  test('parse json', async () => {
    await expect(TheCommand.run(['a-key', '-j', '{a:1}'])).resolves.not.toThrow()
    expect(mockSet).toHaveBeenCalledWith('a-key', { a: 1 }, false)
  })

  test('throw error on bad yaml parsing', async () => {
    await expect(TheCommand.run(['a-key', '-y', 'a:\nhy    '])).rejects.toEqual(new Error('Cannot parse yaml'))
  })

  test('throw error on bad json parsing', async () => {
    await expect(TheCommand.run(['a-key', '-j', '{a:1\n'])).rejects.toEqual(new Error('Cannot parse json'))
  })

  test('parse yaml', async () => {
    await expect(TheCommand.run(['a-key', '-y', 'a:\n  b: true'])).resolves.not.toThrow()
    expect(mockSet).toHaveBeenCalledWith('a-key', { a: { b: true } }, false)
  })

  test('json file', async () => {
    await expect(TheCommand.run(['a-key', '-f', './test/__fixtures__/a.json'])).resolves.not.toThrow()
    expect(mockSet).toHaveBeenCalledWith('a-key', { a: 12 }, false)
  })

  test('yaml file', async () => {
    await expect(TheCommand.run(['a-key', '-f', './test/__fixtures__/a.yaml'])).resolves.not.toThrow()
    expect(mockSet).toHaveBeenCalledWith('a-key', { a: { b: 12 } }, false)
  })

  test('yml file', async () => {
    await expect(TheCommand.run(['a-key', '-f', './test/__fixtures__/a.yml'])).resolves.not.toThrow()
    expect(mockSet).toHaveBeenCalledWith('a-key', { a: { b: 12 } }, false)
  })

  test('other file', async () => {
    await expect(TheCommand.run(['a-key', '-f', './test/__fixtures__/a.txt'])).resolves.not.toThrow()
    expect(mockSet).toHaveBeenCalledWith('a-key', 'raw data', false)
  })

  test('file but no value', async () => {
    await expect(TheCommand.run(['a-key', '-f'])).rejects.toEqual(new Error('Missing filename'))
  })

  test('file but not exists', async () => {
    await expect(TheCommand.run(['a-key', '-f', '/doesnotexist'])).rejects.toEqual(new Error(`Cannot read file: ${path.resolve('/doesnotexist')}`))
  })

  test('prompt for value', async () => {
    config.getPipedData.mockResolvedValue(null)
    prompt.mockResolvedValue('a value')

    await expect(TheCommand.run(['a-key', '-i'])).resolves.not.toThrow()
    expect(mockSet).toHaveBeenCalledWith('a-key', 'a value', false)
  })
})
