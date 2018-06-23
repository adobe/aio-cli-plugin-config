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

const ConfigCommand = require('../../../src/commands/config')
const GetCommand = require('../../../src/commands/config/get')
const ConfigExports = require('../../../src')
const {stdout} = require('stdout-stderr')

beforeAll(() => stdout.start())
afterAll(() => stdout.stop())

test('call with no params', async () => {
  let spy = jest.spyOn(ConfigCommand, 'run')
  let spyGet = jest.spyOn(GetCommand, 'run')
  await ConfigCommand.run([])

  expect(spy).toHaveBeenCalledTimes(1)
  expect(spyGet).toHaveBeenCalledTimes(1)
  expect(spy).toHaveBeenCalledWith([])
  expect(spyGet).toHaveBeenCalledWith([])
})

test('exports', async () => {
  expect(typeof ConfigExports.index).toEqual('function')
  expect(typeof ConfigExports.get).toEqual('function')
  expect(typeof ConfigExports.set).toEqual('function')
  expect(typeof ConfigExports.delete).toEqual('function')
  expect(typeof ConfigExports.clear).toEqual('function')
})

