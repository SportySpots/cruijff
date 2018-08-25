import styled from 'styled-components';

const Block = styled.View`
  padding: 16px;
  height: ${({ height }) => (height || 'auto')}
`;

export default Block;
