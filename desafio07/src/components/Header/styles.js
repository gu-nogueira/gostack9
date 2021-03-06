import styled from 'styled-components/native';
import colors from '../../styles/colors';

import logo from '../../assets/images/logo.png';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const Wrapper = styled.SafeAreaView`
background: ${colors.dark};
flex-direction: row;
`;

export const Container = styled.View`
flex-direction: row;
flex: 1;
justify-content: space-between;
padding: 20px;
`;

export const Logo = styled.TouchableOpacity``;

export const LogoImage = styled.Image.attrs({
  source: logo,
  resizeMode: 'cover',
})`
  width: 185px;
  height: 24px;
`;

export const CartSection = styled.View`
  height: 24px;
  width: 24px;
  flex: 1;
  align-items: flex-end;
  justify-content: flex-end;
`;

export const Cart = styled(Icon).attrs({
  name: 'shopping-cart',
  color: '#fff',
  size: 24,
})``;

export const Counter = styled.Text`
  position: absolute;
  text-align: center;
  top: -8px;
  right: -8px;
  min-width: 18px;
  min-height: 18px;
  background: ${colors.primary};
  color: #fff;
  font-size: 12px;
  padding: 2px;
  border-radius: 9px;
  overflow: hidden;
`;


