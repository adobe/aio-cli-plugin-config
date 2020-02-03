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
const chalk = require('chalk').default

test('sdk init test', async () => {

  const name = 'aio-cli-plugin-config'
  console.log(chalk.blue(`> e2e tests for ${chalk.bold(name)}`))

  console.log(chalk.bold('    - set a new config'))
  execa.sync('./bin/run', ['config:set', 'test_key', 'a value'], { stderr: 'inherit' })

  console.log(chalk.bold('    - list config'))
  list_result = execa.sync('./bin/run', ['config:list'], { stderr: 'inherit' })
  expect(list_result.output[1].includes('abc: "another value"'))

  console.log(chalk.bold('    - delete the test config'))
  execa.sync('./bin/run', ['config:delete', 'test_key'], { stderr: 'inherit' })

  console.log(chalk.green(`    - done for ${chalk.bold(name)}`))
});
