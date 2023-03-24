module.exports = {
  collectCoverageFrom: [
    './**/*.js',
    '!./**/*.(spec|test|config|mock|fixture).js',
    '!./server.js',
    '!./config.js',
    '!./coverage/**/*.js',
  ],
  testEnvironment: 'node',
  testRegex: './.*\\.(test|spec)?\\.js$',
  moduleFileExtensions: ['js', 'json', 'node'],
};
