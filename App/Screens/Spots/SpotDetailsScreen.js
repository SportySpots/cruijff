/* Card component, this is the Card that is used in a list of many Cards */

import React from 'react';

import ImageSwiper from '../../Components/ImageSwiper';
import Header from '../../Components/Spots/Header';
import Text from '../../Components/Text';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import I18n from '../../I18n';
import { ScrollView, View } from 'react-native';
import RatingBig from '../../Components/RatingBig';
import FlatButton from '../../Components/FlatButton';
import SpotProperties from '../../Components/Spots/SpotProperties';
import Colors from '../../Themes/Colors';
import { connect } from 'react-redux';
import api from '../../Services/SeedorfApi';
import SpotMapWithLinkFallback from '../../Components/Spots/SpotMapWithLinkFallback';
import ProfileEditScreen from '../Profile/ProfileEditScreen';
import StackBackHeader from '../../Components/StackBackHeader';
import withQuery from '../../GraphQL/withQuery';

export const GET_SPOT_DETAILS = gql`
  query spot($uuid: UUID) {
    spot(uuid: $uuid) {
      uuid
      name
      images {
        image
      }
      #      reactions {
      #
      #      }
      amenities {
        sport {
          category
        }
        data
      }
      sports {
        category
      }
      address {
        lat
        lng
      }
    }
  }
`;

export const SpotContents = withQuery(GET_SPOT_DETAILS)(class _SpotContents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      userRating: null, // todo: set from props
      showRating: true,
    };
  }

    submitRating = async () => {
      if (this.state.rating > 0) {
        try {
          const result = await api.submitRating(
            this.props.data.spot.uuid,
            this.props.variables.userUuid,
            this.state.rating,
          );
          console.log(result);
        } catch (e) {
          console.log(e);
        }
        this.setState({ userRating: this.state.rating });
      }
    };

    render() {
      const spot = this.props.data.spot;
      const images =
        spot.images.length > 0
          ? spot.images.map(image => image.image)
          : [
            'https://raw.githubusercontent.com/SportySpots/cruijff/graphql/App/Images/spot-placeholder.png',
          ];

      return (
        <Container>
          <ImageSwiperContainer>
            <ImageSwiper images={images} />
          </ImageSwiperContainer>
          <Block>
            <Header spot={spot} />
          </Block>
          {false &&
            this.state.showRating && (
              <Block style={{ backgroundColor: Colors.bgGrey }}>
                <Text>{I18n.t('Rate this spot')}</Text>
                <HorizontalView style={{ justifyContent: 'space-between' }}>
                  <RatingBig
                    rating={this.state.rating}
                    onPress={i => this.setState({ rating: i })}
                  />
                  <FlatButton
                    text={I18n.t(this.state.userRating ? 'thank you' : 'submit').toUpperCase()}
                    onPress={this.submitRating}
                  />
                </HorizontalView>
              </Block>
            )}
          <SpotMapWithLinkFallback spot={spot} />
          {spot.amenities.length > 0 && <SpotProperties properties={spot.amenities[0].data} />}
          <Block style={{ height: 100 }} />
        </Container>
      );
    }
});

const SpotDetailsScreen = connect(state => ({ uuid: state.user.uuid }))(props => (
  <SpotContents
    props={{ ...props }}
    variables={{
      uuid: props.navigation.state.params.uuid,
      user_uuid: props.uuid,
    }}
  />
));

SpotDetailsScreen.navigationOptions = {
  title: I18n.t('Spot details'),
  header: props => <StackBackHeader {...props} title={I18n.t('Spot details')} />,
};

export default SpotDetailsScreen;

const Container = styled(ScrollView)`
  background-color: ${Colors.white};
`;

const ImageSwiperContainer = styled.View`
  height: 200px;
`;

const HorizontalView = styled.View`
  flex-direction: row;
`;

const Block = styled.View`
  padding: 16px;
`;
