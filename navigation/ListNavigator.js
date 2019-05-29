import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import NewListScreen from '../screens/NewListScreen';
import MainTabNavigator from './MainTabNavigator';

const ListStack = createStackNavigator({
  NewList: {
    screen: NewListScreen,
    navigationOptions: (({navigation}) => ({
      tabBarLabel: 'New List'
    }))
  }
});

export default ListStack
