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

const ClearCommand = require('../../../src/commands/config/clear.js')
const {stdout} = require('stdout-stderr')
// auto-mocked in __mocks__ folder
jest.mock('conf')

beforeAll(() => stdout.start())
afterAll(() => stdout.stop())

test('clear', async () => {
  return expect(ClearCommand.run([])).resolves.toBeTruthy()
})

test('clear a key', async () => {
  return expect(ClearCommand.run(['mykey'])).resolves.toBeTruthy()
})
