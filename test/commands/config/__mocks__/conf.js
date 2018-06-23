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

const mock = jest.fn().mockImplementation(
  function () { // constructor
    let _store = {
      known_key: 'known_value',
    }

    // set properties and functions for object
    // this is how you can get the call stats on the mock instance,
    // see https://github.com/facebook/jest/issues/2982
    Object.defineProperty(this, 'store',
      {
        get: jest.fn(() => _store),
      })

    this.get = jest.fn(k => _store[k])
    this.set = jest.fn()
    this.delete = jest.fn()
    this.clear = jest.fn()
  })

module.exports = mock

