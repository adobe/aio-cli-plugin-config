let set = jest.fn(() => true)
let get = jest.fn(() => true)

module.exports = jest.fn().mockImplementation(() => {
  return { set, get, reload: () => true, global: { file: 'global' }, local: { file: 'local' } }
})
module.exports.mockSet = set
module.exports.mockGet = get
