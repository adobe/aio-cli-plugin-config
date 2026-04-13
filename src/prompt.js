/*
Copyright 2026 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const { input, confirm } = require('@inquirer/prompts')

// @inquirer/core pipes a MuteStream to process.stdout on every prompt call,
// adding an 'error' listener each time. oclif's plugin loading fills most of
// the default 10-slot budget before we even get here, so bump the limit to
// avoid the MaxListenersExceededWarning.
process.stdout.setMaxListeners(Math.max(process.stdout.getMaxListeners(), 20))
process.stderr.setMaxListeners(Math.max(process.stderr.getMaxListeners(), 20))

/**
 * Prompts the user for text input.
 *
 * @param {string} message - the prompt message to display
 * @returns {Promise<string>} the user's input
 */
async function prompt (message) {
  return input({ message })
}

/**
 * Prompts the user for a yes/no confirmation.
 *
 * @param {string} message - the prompt message to display
 * @param {boolean} [defaultValue=false] - the default value if the user just presses Enter
 * @returns {Promise<boolean>} true if the user confirmed
 */
async function promptConfirm (message, defaultValue = false) {
  return confirm({ message, default: defaultValue })
}

module.exports = { prompt, promptConfirm }
