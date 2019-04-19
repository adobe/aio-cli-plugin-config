const mockConfig = {
  dotenv: jest.fn(),
  getPipedData: jest.fn()
}

module.exports = mockConfig
module.exports.mock = mockConfig
