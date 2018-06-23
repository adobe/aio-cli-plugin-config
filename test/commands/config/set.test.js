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

const SetCommand = require('../../../src/commands/config/set.js')
const {stdout} = require('stdout-stderr')
const path = require('path')
const sampleJsonFilePath = path.join(__dirname, '../../fixtures/config-sample.json')
// auto-mocked in __mocks__ folder
jest.mock('conf')

beforeAll(() => stdout.start())
afterAll(() => stdout.stop())

test('no key or value', async () => {
  const val = await SetCommand.run([])
  return expect(val).toEqual(false)
})

test('have key, no value', async () => {
  const val = await SetCommand.run(['testkey'])
  return expect(val).toEqual(false)
})

test('have key, and value', async () => {
  const val = await SetCommand.run(['foo', 'bar'])
  return expect(val).toEqual(true)
})

test('value is file path (string)', async () => {
  const p = sampleJsonFilePath
  const val = await SetCommand.run(['foo', p, '--file'])
  return expect(val).toEqual(true)
})

test('value is file path (json)', async () => {
  const p = sampleJsonFilePath
  const val = await SetCommand.run(['foo', p, '--file', '--mime-type=application/json'])
  return expect(val).toEqual(true)
})

test('value is file path (file path not found)', async () => {
  const p = path.join(__dirname, 'fake_file.json')
  const val = SetCommand.run(['foo', p, '--file'])
  return expect(val).rejects.toEqual(new Error(`ENOENT: no such file or directory, lstat '${p}'`))
})

test('value is file path (file path is folder)', async () => {
  const p = __dirname
  const val = SetCommand.run(['foo', p, '--file'])
  return expect(val).rejects.toEqual(new Error('file path cannot be a folder.'))
})

test('value is file path (file path not found - coverage)', async () => {
  const p = null
  const val = new SetCommand().setFromFilePath('foo', p)
  return expect(val).rejects.toEqual(new Error('Can\'t set file path: it is null or undefined.'))
})
