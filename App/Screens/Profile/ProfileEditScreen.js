import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import DefaultButton from '../../Components/DefaultButton';
import Slider from '../../Components/Slider';
import Text from '../../Components/Text';
import UserCircle from '../../Components/UserCircle';
import I18n from '../../I18n/index';
import SeedorfAPI from '../../Services/SeedorfApi';
import Colors from '../../Themes/Colors';
import { GET_USER_DETAILS } from './ProfileDetailsScreen';

class ProfileEditComponent extends React.PureComponent {
  static propTypes = {
    refetch: PropTypes.func,
    user: PropTypes.shape({
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      // age: PropTypes.number,
      // level: PropTypes.number
    }),
  };

  constructor(props) {
    super(props);
    this.state = { user: { ...this.props.user } };
  }

  updateUser = async () => {
    const result = await SeedorfAPI.updateUser({
      uuid: this.props.user.uuid,
      first_name: this.state.user.first_name,
      last_name: this.state.user.last_name,
    });
    if (result.ok) {
      this.props.refetch();
    }
  };

  render() {
    const user = this.state.user;
    return (
      <ScrollView style={styles.outerContainer}>
        <View style={styles.center}>
          <UserCircle user={user} />
        </View>
        <View style={styles.fields}>
          <View style={styles.fieldSet}>
            <Text>{I18n.t('First name')}</Text>
            <TextInput
              style={styles.input}
              onChangeText={val => this.setState({ user: { ...user, first_name: val } })}
              defaultValue={user.first_name}
            />
          </View>
          <View style={styles.fieldSet}>
            <Text>{I18n.t('Last name')}</Text>
            <TextInput
              style={styles.input}
              onChangeText={val => this.setState({ user: { ...user, last_name: val } })}
              defaultValue={user.last_name}
            />
          </View>
          {false && (
            <View style={styles.fieldSet}>
              <Text>{I18n.t('Age')}</Text>
              <TextInput keyboardType="numeric" defaultValue="30" />
            </View>
          )}
          {false && (
            <View style={styles.fieldSet}>
              <Text>{I18n.t('Style')}</Text>
              <View style={styles.sliderLabels}>
                <Text.S>{I18n.t('recreative')}</Text.S>
                <Text.S>{I18n.t('competitive')}</Text.S>
              </View>
              <View style={{ flex: 1, height: 50 }}>
                <Slider value={this.props.user.level} onChange={console.log} />
              </View>
            </View>
          )}
          <DefaultButton style={{ width: 100 }} text={I18n.t('Save')} onPress={this.updateUser} />
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const ProfileEditScreen = connect(mapStateToProps)(class extends Component {
    static propTypes = {
      user: PropTypes.object,
      navigation: PropTypes.object,
    };

    render() {
      return (
        <Query query={GET_USER_DETAILS} variables={{ uuid: this.props.user.uuid }}>
          {({
 loading, error, data, refetch,
}) => {
            if (loading) return <Text>Loading...</Text>;
            if (error) return <Text>Error :( {JSON.stringify(error)}</Text>;
            return <ProfileEditComponent {...this.props} refetch={refetch} user={data.user} />;
          }}
        </Query>
      );
    }
});

export default ProfileEditScreen;

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100,
    borderRadius: 100,
  },
  center: {
    alignItems: 'center',
  },
  outerContainer: {
    flex: 1,
    paddingTop: 16,
    backgroundColor: Colors.white,
  },
  fields: {
    marginHorizontal: 16,
  },
  fieldSet: {
    marginTop: 16,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    fontSize: 16,
    marginVertical: 8,
    paddingVertical: 8,
  },
});
