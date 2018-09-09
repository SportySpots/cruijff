import styled from 'styled-components';
import Text from '../../Components/Common/Text';
import Colors from '../../Themes/Colors';

export const Title = styled(Text.L)`
  color: ${Colors.white};
  margin-bottom: 32;
`;

export const Label = styled(Text.M)`
  color: ${Colors.white};
  font-size: 24px;
`;

export const FormField = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 16px 0;
  /* flex: 1;
  flex-wrap: wrap; */
`;

export const ModalOuter = styled.View`
  flex: 1;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.8);
`;

export const ModalInner = styled.View`
  flex: 1;
  background-color: ${Colors.white};
  margin: 36px;
  padding: 8px;
`;
