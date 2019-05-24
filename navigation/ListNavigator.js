import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, HeaderBackButton } from 'react-navigation';

import NewListScreen from '../screens/NewListScreen';

const ListStack = createStackNavigator({
  Lists: {
    screen: NewListScreen,
    navigationOptions: (({navigation}) => ({
      tabBarLabel: 'New List',
      headerLeft: Platform.OS === 'ios' ? <HeaderBackButton onPress={() => navigation.goBack(null)} /> : null
    }))
  }
});

export default ListStack
