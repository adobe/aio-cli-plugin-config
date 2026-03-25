/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const { prompt } = require('../../src/prompt')

jest.mock('@inquirer/prompts', () => ({
  input: jest.fn()
}))
const { input } = require('@inquirer/prompts')

describe('prompt', () => {
  test('returns user input', async () => {
    input.mockResolvedValue('user answer')

    const result = await prompt('enter value')

    expect(input).toHaveBeenCalledWith({ message: 'enter value' })
    expect(result).toEqual('user answer')
  })
})
