/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const execa = require('execa')
const chalk = require('chalk')
const fs = require('fs')

process.env.DEBUG = 'aio-cli-plugin-config*'
// set global config file
const CONFIG_FILE = '.e2e-aio-cli-plugin-config'
process.env.AIO_CONFIG_FILE = CONFIG_FILE

beforeEach(async () => {
  fs.writeFileSync(CONFIG_FILE, '')
})
afterAll(async () => {
  fs.unlinkSync(CONFIG_FILE)
})

test('config create test', async () => {
  const packagejson = JSON.parse(fs.readFileSync('package.json').toString())
  const name = `${packagejson.name}`
  console.log(chalk.blue(`> e2e tests for ${chalk.bold(name)}`))

  let result

  console.log(chalk.bold('    - set a new config'))
  expect(() => { execa.sync('./bin/run', ['config:set', 'test_key', 'a value'], { stderr: 'inherit' }) }).not.toThrow()

  console.log(chalk.bold('    - get a config (after it is set)'))
  result = execa.sync('./bin/run', ['config:get', 'test_key'], { stderr: 'inherit' })
  expect(result.stdout).toEqual('a value')

  console.log(chalk.bold('    - list config'))
  result = execa.sync('./bin/run', ['config:list'], { stderr: 'inherit' })
  expect(result.stdout).toEqual(expect.stringContaining('test_key: "a value"'))

  console.log(chalk.bold('    - delete the test config'))
  expect(() => { execa.sync('./bin/run', ['config:delete', 'test_key'], { stderr: 'inherit' }) }).not.toThrow()

  console.log(chalk.bold('    - get a config (after it is deleted)'))
  result = execa.sync('./bin/run', ['config:get', 'test_key'], { stderr: 'inherit' })
  expect(result.stdout).toEqual('')

  console.log(chalk.green(`    - done for ${chalk.bold(name)}`))
})
