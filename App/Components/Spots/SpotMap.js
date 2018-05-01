import React from 'react'
import { ScrollView, View, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import styled from 'styled-components'
import { GET_SPOTS } from './SpotList'
import Colors from '../../Themes/Colors'
import Text from '../Text'
import SpotsMap from '../Maps/SpotsMap'

// TODO: handle no spots were found case

const Container = styled(ScrollView)`
  background-color: ${Colors.white};
`

const ImageSwiperContainer = styled.View`
  height: 200px;
`

const HorizontalView = styled.View`
  flex-direction: row;
`

const SpotMap = ({ navigation }) => (
  <Query query={GET_SPOTS}>
    {({ loading, error, data }) => {
      if (loading) return <Text>Loading...</Text>
      if (error) return <Text>Error :( {JSON.stringify(error)}</Text>

      console.log('\nSPOTS', data.spots)

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

/*
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data.spots.slice(0, 100)}
            renderItem={({ item }) => (
              <CardContainer
                spot={item}
                onPress={() =>
                  navigation.navigate('SpotDetailsScreen', {
                    uuid: item.uuid
                  })
                }
              />
            )}
            keyExtractor={item => item.uuid}
          />
*/
