import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, HeaderBackButton } from 'react-navigation';

import NewListScreen from '../screens/NewListScreen';
import MainTabNavigator from './MainTabNavigator';

const ListStack = createStackNavigator({
  NewList: {
    screen: NewListScreen,
    navigationOptions: (({navigation}) => ({
      tabBarLabel: 'New List',
      headerLeft: Platform.OS === 'ios' ? <HeaderBackButton onPress={() => navigation.goBack(null)} /> : null
    }))
  }
});

export default ListStack
