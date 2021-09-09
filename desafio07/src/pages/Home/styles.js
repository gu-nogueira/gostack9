import styled from 'styled-components/native';
import colors from '../../styles/colors';

export const Container = styled.View`
  flex: 1;
  background: ${colors.dark};
`;

export const Loading = styled.ActivityIndicator.attrs({
  color: colors.primary,
  size: 60,
})`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ProductList = styled.FlatList.attrs({
  horizontal: true,
})`
  flex-grow: 0;
`;

export const Product = styled.View`
  background: #fff;
  padding: 10px;
  margin: 15px;
  border-radius: 4px;
  width: 220px;
`;

export const ProductImage = styled.Image`
  height: 200px;
  width: 200px;
  background: #eee;
  border-radius: 4px;
`;

export const ProductTitle = styled.Text`
  font-size: 16px;
`;

export const ProductPrice = styled.Text`
  margin: 14px 0;
  font-size: 20px;
  font-weight: bold;
`;

export const Button = styled.TouchableOpacity`
  background: ${colors.primary};
  flex-direction: row;
  align-items: center;
  border-radius: 4px;
  margin-top: auto;
`;

export const AmountButton = styled.View`
  padding: 12px;
  background: ${colors.secondary};
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  flex-direction: row;
  align-items: center;
`;

export const AmountText = styled.Text`
  color: #fff;
  margin: 0 6px 0 4px;
`;

export const TextButton = styled.Text`
  flex: 1;
  text-align: center;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
`;
