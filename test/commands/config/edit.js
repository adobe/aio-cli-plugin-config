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
const child_process = require('child_process')
let platform = process.platform

afterAll(() => {
  Object.defineProperty(process, 'platform', {
    value: platform
  })
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
      expect(child_process.spawn).toHaveBeenCalledWith('vi', ['global'], { 'detached': true, 'stdio': 'inherit' })
    })
  })

  test('default - linux', () => {
    Object.defineProperty(process, 'platform', {
      value: 'linux'
    })
    return TheCommand.run([]).then(() => {
      expect(child_process.spawn).toHaveBeenCalledWith('vi', ['global'], { 'detached': true, 'stdio': 'inherit' })
    })
  })

  test('default - win32', () => {
    Object.defineProperty(process, 'platform', {
      value: 'win32'
    })
    return TheCommand.run([]).then(() => {
      expect(child_process.spawn).toHaveBeenCalledWith('notepad', ['global'], { 'detached': true, 'stdio': 'inherit' })
    })
  })

  test('local', () => {
    Object.defineProperty(process, 'platform', {
      value: 'darwin'
    })
    return TheCommand.run(['-l']).then(() => {
      expect(child_process.spawn).toHaveBeenCalledWith('vi', ['local'], { 'detached': true, 'stdio': 'inherit' })
    })
  })

  test('global', () => {
    Object.defineProperty(process, 'platform', {
      value: 'darwin'
    })
    return TheCommand.run(['-g']).then(() => {
      expect(child_process.spawn).toHaveBeenCalledWith('vi', ['global'], { 'detached': true, 'stdio': 'inherit' })
    })
  })

  test('default - env', () => {
    process.env['EDITOR'] = 'foobar'
    return TheCommand.run([]).then(() => {
      expect(child_process.spawn).toHaveBeenCalledWith('foobar', ['global'], { 'detached': true, 'stdio': 'inherit' })
    })
  })
})
