import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import api from '../../../Services/SeedorfApi';
import I18n from '../../../I18n';
import spotDetailsFragment from '../../../GraphQL/Spots/Fragments/spotDetails';
// import FlatButton from '../../Common/FlatButton';
import Row from '../../Common/Row';
import Block from '../../Common/Block';
import Rating from '../../Common/Rating';
import Text from '../../Common/Text';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class SpotRating extends React.PureComponent {
  state = {
    rating: 0,
    userRating: null, // todo: set from props
    showRating: true,
  }

  submitRating = async () => {
    const { spotId, userId } = this.props;
    const { rating } = this.state;

    if (rating <= 0) {
      return;
    }

    try {
      const result = await api.submitRating(spotId, userId, rating);
      console.log(result);
      this.setState({ userRating: rating });
    } catch (exc) {
      console.log(exc);
    }
  };

  render() {
    const { rating, userRating, showRating } = this.state;

    if (!showRating) {
      return null;
    }

    return (
      <Block bgColor="bgGrey">
        <Text>{I18n.t('Rate this spot')}</Text>
        <Row justifyContent="space-between">
          <Rating
            rating={rating}
            onPress={i => this.setState({ rating: i })}
          />
          {/* <FlatButton
            text={I18n.t(userRating ? 'thank you' : 'submit').toUpperCase()}
            onPress={this.submitRating}
          /> */}
        </Row>
      </Block>
    );
  }
}

SpotRating.propTypes = {
  spot: propType(spotDetailsFragment).isRequired, // eslint-disable-line
  userId: PropTypes.string.isRequired,
};

export default SpotRating;
