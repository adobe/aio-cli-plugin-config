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
const config = require('@adobe/aio-cli-config')
const path = require('path')
const { mockSet } = require('@adobe/aio-cli-config/src/Config')

jest.mock('cli-ux')
const { cli } = require('cli-ux')

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

  test('default', () => {
    return TheCommand.run(['a-key', 'value']).then(() => {
      expect(mockSet).toHaveBeenCalledWith('a-key', 'value', false)
    })
  })

  test('local', () => {
    return TheCommand.run(['-l', 'a-key', 'value']).then(() => {
      expect(mockSet).toHaveBeenCalledWith('a-key', 'value', true)
    })
  })

  test('global', () => {
    return TheCommand.run(['-g', 'a-key', 'value']).then(() => {
      expect(mockSet).toHaveBeenCalledWith('a-key', 'value', false)
    })
  })

  test('no value', (done) => {
    return TheCommand.run(['a-key']).then(done.fail).catch((a) => {
      expect(a.message).toEqual('Missing value')
      done()
    })
  })

  test('get piped data', () => {
    config.getPipedData.mockResolvedValue('a file')
    return TheCommand.run(['-g', 'a-key']).then(() => {
      expect(config.getPipedData).toHaveBeenCalledWith()
      expect(mockSet).toHaveBeenCalledWith('a-key', 'a file', false)
    })
  })

  test('parse key=value', () => {
    return TheCommand.run(['a-key=value']).then(() => {
      expect(mockSet).toHaveBeenCalledWith('a-key', 'value', false)
    })
  })

  test('parse json', () => {
    return TheCommand.run(['a-key', '-j', '{a:1}']).then(() => {
      expect(mockSet).toHaveBeenCalledWith('a-key', { a: 1 }, false)
    })
  })

  test('throw error on bad yaml parsing', (done) => {
    return TheCommand.run(['a-key', '-y', 'a:\nhy    ']).then(done.fail).catch((e) => {
      expect(e.message).toEqual('Cannot parse yaml')
      done()
    })
  })

  test('throw error on bad json parsing', (done) => {
    return TheCommand.run(['a-key', '-j', '{a:1\n']).then(done.fail).catch((e) => {
      expect(e.message).toEqual('Cannot parse json')
      done()
    })
  })

  test('parse yaml', () => {
    return TheCommand.run(['a-key', '-y', 'a:\n  b: true']).then(() => {
      expect(mockSet).toHaveBeenCalledWith('a-key', { a: { b: true } }, false)
    })
  })

  test('json file', () => {
    return TheCommand.run(['a-key', '-f', './test/__fixtures__/a.json']).then(() => {
      expect(mockSet).toHaveBeenCalledWith('a-key', { a: 12 }, false)
    })
  })

  test('yaml file', () => {
    return TheCommand.run(['a-key', '-f', './test/__fixtures__/a.yaml']).then(() => {
      expect(mockSet).toHaveBeenCalledWith('a-key', { a: { b: 12 } }, false)
    })
  })

  test('yml file', () => {
    return TheCommand.run(['a-key', '-f', './test/__fixtures__/a.yml']).then(() => {
      expect(mockSet).toHaveBeenCalledWith('a-key', { a: { b: 12 } }, false)
    })
  })

  test('other file', () => {
    return TheCommand.run(['a-key', '-f', './test/__fixtures__/a.txt']).then(() => {
      expect(mockSet).toHaveBeenCalledWith('a-key', 'raw data', false)
    })
  })

  test('file but no value', (done) => {
    return TheCommand.run(['a-key', '-f']).then(done.fail).catch((a) => {
      expect(a.message).toEqual('Missing filename')
      done()
    })
  })

  test('file but not exists', (done) => {
    return TheCommand.run(['a-key', '-f', '/doesnotexist']).then(done.fail).catch((a) => {
      expect(a.message).toEqual(`Cannot read file: ${path.resolve('/doesnotexist')}`)
      done()
    })
  })

  test('prompt for value', () => {
    config.getPipedData.mockResolvedValue(null)
    cli.prompt = jest.fn(() => 'a value')
    return TheCommand.run(['a-key', '-i']).then(() => {
      expect(mockSet).toHaveBeenCalledWith('a-key', 'a value', false)
    })
  })
})
