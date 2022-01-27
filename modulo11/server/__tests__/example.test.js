// temos 'test', 'describe', 'it', 'expect'

function soma(a, b) {
  return a + b;
}

// No primeiro parâmetro do test, passamos uma descrição bem definida de qual funcionalidade estamos testando e em quais condições
test('if call soma function with 4 and 5 it should return 9', () => {
  const result = soma(4, 5);

  // expect pega o resultado e compara com algum valor
  expect(result).toBe(9);
});
