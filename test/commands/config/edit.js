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

const TheCommand = require('../../../src/commands/config/edit.js')

jest.mock('child_process')
const childProcess = require('child_process')
const platform = process.platform
const PRE_ENV = process.env

afterAll(() => {
  process.env = PRE_ENV
  process.platform = platform
})

describe('get', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('flags', () => {
    expect(Object.keys(TheCommand.flags)).toEqual(['local', 'global', 'json', 'yaml'])
  })

  test('default - darwin', () => {
    Object.defineProperty(process, 'platform', {
      value: 'darwin'
    })
    return TheCommand.run([]).then(() => {
      expect(childProcess.spawn).toHaveBeenCalledWith('vi', ['global'], { detached: true, stdio: 'inherit' })
    })
  })

  test('default - linux', () => {
    Object.defineProperty(process, 'platform', {
      value: 'linux'
    })
    delete process.env.EDITOR
    return TheCommand.run([]).then(() => {
      expect(childProcess.spawn).toHaveBeenCalledWith('vi', ['global'], { detached: true, stdio: 'inherit' })
    })
  })

  test('non-default - win32', () => {
    Object.defineProperty(process, 'platform', {
      value: 'win32'
    })
    process.env.EDITOR = 'winamp'

    return TheCommand.run([]).then(() => {
      expect(childProcess.spawn).toHaveBeenCalledWith('winamp', ['global'], { detached: true, stdio: 'inherit' })
    })
  })

  test('default - win32', () => {
    Object.defineProperty(process, 'platform', {
      value: 'win32'
    })

    delete process.env.EDITOR

    return TheCommand.run([]).then(() => {
      expect(childProcess.spawn).toHaveBeenCalledWith('notepad', ['global'], { detached: true, stdio: 'inherit' })
    })
  })

  test('local', () => {
    Object.defineProperty(process, 'platform', {
      value: 'darwin'
    })

    process.env.EDITOR = 'vi'
    return TheCommand.run(['-l']).then(() => {
      expect(childProcess.spawn).toHaveBeenCalledWith('vi', ['local'], { detached: true, stdio: 'inherit' })
    })
  })

  test('global', () => {
    Object.defineProperty(process, 'platform', {
      value: 'darwin'
    })
    return TheCommand.run(['-g']).then(() => {
      expect(childProcess.spawn).toHaveBeenCalledWith('vi', ['global'], { detached: true, stdio: 'inherit' })
    })
  })

  test('default - env', () => {
    process.env.EDITOR = 'foobar'
    return TheCommand.run([]).then(() => {
      expect(childProcess.spawn).toHaveBeenCalledWith('foobar', ['global'], { detached: true, stdio: 'inherit' })
    })
  })

  test('no default - env', () => {
    delete process.env.EDITOR
    return TheCommand.run([]).then(() => {
      expect(childProcess.spawn).toHaveBeenCalledWith('vi', ['global'], { detached: true, stdio: 'inherit' })
    })
  })
})
