// Vamos utilizar a sintaxe do CommonJS
module.exports = {
  // Vamos exportar quais presets do babel iremos utilizar
  presets: [
    // O preset-env é responsável por alterar as funcionalidades do Javascript que o browser ainda não entende
    "@babel/preset-env",
    // Interpreta as funções do react que o navegador não entende, como o JSX por exemplo
    "@babel/preset-react"
  ],
};