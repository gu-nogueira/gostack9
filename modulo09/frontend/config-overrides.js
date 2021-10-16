const { addBabelPlugin, override } = require('customize-cra');

// Override substitui algumas configurações do create-react-app
module.exports = override(
  addBabelPlugin([
    'babel-plugin-root-import',
    // Com isso, as importações podem ser feitas direto de src
    {
      rootPathSuffix: 'src'
    }
  ])
);
