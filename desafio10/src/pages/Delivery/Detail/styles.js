import styled from 'styled-components/native';

import colors from '~/styles/colors';

export const Container = styled.SafeAreaView`
  flex: 1;
  /* background: ${colors.background}; */
`;

export const Background = styled.View`
  background: ${colors.purple};
  height: 140px;
`;

export const Content = styled.View`
  align-items: center;
  top: -70px;
`;

export const Card = styled.View`
  background: #fff;
  padding: 15px;
  width: 335px;
  border-radius: 4px;
  margin-bottom: 9px;
`;

export const CardHeader = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CardTitle = styled.Text`
  margin-left: 5px;
  color: ${colors.purple};
  font-size: 14px;
  font-weight: bold;
`;

export const CardBody = styled.View`
  margin-top: 5px;
`;

export const Label = styled.Text`
  color: ${colors.grey1};
  margin-top: ${(props) => (props.firstItem ? 0 : '15px')};
  text-transform: uppercase;
  font-size: 14px;
  font-weight: bold;
`;

export const Text = styled(Label)`
  color: #666666;
  margin-top: 5px;
  text-transform: none;
  font-weight: normal;
`;

export const TwoRows = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
