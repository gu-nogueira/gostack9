import React, { useState, useEffect, useMemo, useCallback } from 'react';

function App() {

  // Definimos um valor inicial para `useState()`. Como é um array que vamos armazenar, então '[]'
  // useState retorna um array com duas posições. A primeira é o próprio estado, a segunda é a função que será utiizada para atualizar o estado
  const [techs, setTech] = useState([]);

  // Nesse caso, o valor inicial do state é uma string vazia
  const [newTech, setNewTech] = useState('');

  // Temos agora uma função para atualizar cada estado

  const handleAdd = useCallback(() => {
    setTech([...techs, newTech]);
    setNewTech('');
  }, [techs, newTech]);

  // IMPORTANTE: o useEffect 'componentDidMount' deve vir antes do useEffect de 'componentDidUpdate', pois se não executa primeiro

  // Se passarmos no segundo parâmetro das dependências apenas um array vazio, o useEffect executa uma única vez assim que o componente montar em tela, assim como o componentDiDMount
  useEffect(() => {
    const storageTechs = localStorage.getItem('techs');
    if (storageTechs) {
      setTech(JSON.parse(storageTechs));
    }

    // Quando quisermos simular um 'componentWillUnmount' basta retornarmos uma função no useEffect parecido com o 'componentDidMount'
    return () => {
      // Vamos utilizar isso quando precisarmos remover um eventListener que adicionamos no componente que vai deixar de ser montado por exemplo
      document.removeEventListener();
    };
  }, [])

  // Podemos escrever o useEffect dentro da função mesmo
  // O primeiro parâmetro que o useEffect recebe é a função que vai ser executada
  // O segundo parâmetro define quando ela será executada. É um array de dependências, que fica monitorando alterações nas variáveis passadas. Neste exemplo, toda vez que houve uma alteração no state de techs, executa este useEffect
  useEffect(() => {
    localStorage.setItem('techs', JSON.stringify(techs));
  }, [techs]);

  // useMemo retorna um valor único, tem um listener assim como o useEffect, um array onde são passadas as variáveis a serem ouvidas
  // Dessa forma, é evitado chamar techSize em toda renderização do componente, apenas se houver alterações em 'techs'
  const techSize = useMemo(() => techs.length, [techs]);

  // Agora para cada estado é necessário um useState... Caso tivéssemos mais informações, seria necessário outros useState
  return (
    <>
      <ul>
        { techs.map(tech => (<li key={tech}>{tech}</li>)) }
      </ul>
      <strong>Você tem {techSize} tecnologias.</strong> <br />
      <input value={newTech} type="text" onChange={e => setNewTech(e.target.value)} />
      <button onClick={handleAdd} type="button">Adicionar</button>
    </>
  );
}

export default App;
