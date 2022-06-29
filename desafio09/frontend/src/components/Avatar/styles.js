import styled from 'styled-components';

export const avatarColors = [
  '#A28FD0',
  '#CB946C',
  '#83CEC9',
  '#CC7584',
  '#A8D080',
  '#CCCC8B',
  '#489fb5',
  '#e26d5c',
  '#00a6fb',
  '#02c39a',
];

export const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
`;

export const AvatarInitials = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: ${(props) => props.color};
  background: ${(props) => props.color + '33'};
`;
