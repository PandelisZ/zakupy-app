import React, { Component } from 'react'
import { createDrawerNavigator, SafeAreaView, DrawerItems } from 'react-navigation'
import MainTabNavigator from './MainTabNavigator';
import ListStack from './ListNavigator';

import {ScrollView, Text, View, StyleSheet} from 'react-native';

import { connect } from 'react-redux';
import { Container, Button } from 'native-base';


// Manifest of possible screens
// const DrawerNavigation = (props) => {
//     console.log(props)
//     const Navigation = createDrawerNavigator({
//         List: { screen: MainTabNavigator},
//         'New List': { screen: ListStack}
//     })
//     return <Navigation {...props} />
// }

// export default DrawerNavigation

// export default connect(
//     (state) => {
//         return { lists: state.listReducer.lists }
//     },
//     undefined,
// )(DrawerNavigation)


export default createDrawerNavigator(
    {
      List: { screen: MainTabNavigator},
      'New List': { screen: ListStack}
    }, {
        initialRouteName: 'List',
        drawerWidth: 300,
        drawerPosition: 'left',
        contentComponent: props => (
            <CustomDrawerContentComponent {...props} />
          )
    }
  )

class CustomDrawerContentComponent extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        return (
        <ScrollView>
                <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
                <DrawerItems {...this.props} />
                </SafeAreaView>
        </ScrollView>
        )

    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
