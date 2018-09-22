module.exports = {
  environments: ['browser', 'jest'],
  danglingCommas: false,
  importStatementFormatter({ importStatement }) {
    return importStatement.replace(/{ styled }/, 'styled')
                          .replace(/{ PropTypes }/, 'PropTypes')
                          .replace(/;$/, '');
  },
  useRelativePaths: false,
  namedExports: {
    'prop-types': ['PropTypes'],
    'styled-components': ['styled']
  },
  aliases: {
    '@': 'src'
  },
  moduleNameFormatter({moduleName}) {
    if (moduleName.startsWith('src')) {
      return `@${moduleName.substring(3)}`
    } else {
      return moduleName
    }
  }
}
