import styled from 'styled-components';

const Container = styled.section`
  max-width: 700px;
  background: #FFF;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin: 80px auto;
  h1 {
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;

    /* Isso são estilos encadeados */
    /* Interessante, usar o svg diretamente no css para ícones */
    svg {
    margin-right: 10px;
    }
  }
`;

// Trocaremos neste formato o export aqui, assim podemos pegar esse Common (componente estilizado) em qualquer lugar agora
export default Container;
