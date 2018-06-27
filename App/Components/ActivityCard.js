import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components';
import Colors from '../Themes/Colors';
import Text from './Text';


const ActivityCard = () => (
  <ActivityCardContainer>
    <TopActivityCardContainer />
    <BottomActivityCardContainer>
      <ImageActivityCardContainer />
      <AttendeesActivityCardContainer />
    </BottomActivityCardContainer>
  </ActivityCardContainer>
);

export default ActivityCard;

const HorizontalView = styled.View`
  flex-direction: column;
`;

const ActivityCardContainer = styled(HorizontalView)`
  display: flex;
  padding-horizontal: 8px;
  background-color: red;
  height: 200px;
`;

const TopActivityCardContainer = styled.View`
  flex: 1;
  background-color: grey;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const BottomActivityCardContainer = styled.View`
  flex: 3;
  display: flex;
  background-color: green;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

const ImageActivityCardContainer = styled.View`
  flex: 3;
  background-color: blue;
`;

const AttendeesActivityCardContainer = styled.View`
  flex: 2;
  background-color: yellow;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

const Title = styled(Text.M)`
  color: ${Colors.white};
  margin-left: 8px;
`;

const WhiteSM = styled(Text.SM)`
  color: ${Colors.white};
`;

const OrangeSM = styled(Text.SM)`
  color: ${Colors.actionYellow};
`;

