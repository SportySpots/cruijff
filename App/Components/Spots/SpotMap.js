import React from 'react'
import { ScrollView, View } from 'react-native' // eslint-disable-line
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { GET_SPOTS } from './SpotList'
import Text from '../Text'
import SpotsMap from '../Maps/SpotsMap'

// TODO: handle no spots were found case

const SpotMap = ({ navigation }) => (
  <Query query={GET_SPOTS}>
    {({ loading, error, data }) => {
      if (loading) return <Text>Loading...</Text>
      if (error) return <Text>Error :( {JSON.stringify(error)}</Text>
      return <SpotsMap navigation={navigation} spots={data.spots} />
    }}
  </Query>
)

SpotMap.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
}

export default SpotMap
