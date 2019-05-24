import React, { Component } from 'react'
import { createDrawerNavigator, SafeAreaView, DrawerItems } from 'react-navigation'
import MainTabNavigator from './MainTabNavigator';
import { TouchableItem } from 'react-navigation-drawer/dist/views/TouchableItem';
import {ScrollView, Text, View, StyleSheet} from 'react-native';

import { connect } from 'react-redux';
import ListStack from './ListNavigator';


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


class CustomDrawerContentComponent extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
        <ScrollView>
            <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
                {this.props.lists.map(l => {
                    console.log(l)
                    return (
                        <Text
                            style={styles.label}
                            key={l._id}
                        onPress={() => {
                        }}
                        >
                            {l.name}
                        </Text>
                    )
                })}
                {this.props.lists.length === 0 && <Text>You do not currently have any shopping lists</Text>}
            </SafeAreaView>
        </ScrollView>
        )
    }
}

const ReduxDrawer = connect(
    (state) => {
        return { lists: state.listReducer.lists }
    },
    () => {
        return {}
    },
)(CustomDrawerContentComponent)


export default createDrawerNavigator(
    {
      Stack: { screen: MainTabNavigator}
    }, {
        drawerWidth: 300,
        drawerPosition: 'left',
        contentComponent: props => (
            <ReduxDrawer {...props} />
          )
    }
)

const styles = StyleSheet.create({
    container: {
        paddingVertical: 4,
      },
      item: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      icon: {
        marginHorizontal: 16,
        width: 24,
        alignItems: 'center',
      },
      inactiveIcon: {
        /*
         * Icons have 0.54 opacity according to guidelines
         * 100/87 * 54 ~= 62
         */
        opacity: 0.62,
      },
      label: {
        margin: 16,
        fontWeight: 'bold',
      },
});
