import React, { Component } from 'react'
import { createDrawerNavigator, SafeAreaView, withNavigation, NavigationActions } from 'react-navigation'
import MainTabNavigator from './MainTabNavigator';
import { TouchableItem } from 'react-navigation-drawer/dist/views/TouchableItem';
import {ScrollView, Text, View, StyleSheet} from 'react-native';

import { connect } from 'react-redux';
import ListStack from './ListNavigator';
import Colors from '../constants/Colors';
import { setCurrentList } from '../store/reducers/listReducer';
import { Button } from 'native-base';


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

        this.rehydrateListView = this.rehydrateListView.bind(this)
        this.newList = this.newList.bind(this)
    }


    rehydrateListView(list) {
        this.props.setCurrentList(list)

        this.props.navigation.closeDrawer();
        this.props.navigation.navigate('Item');
    }

    newList() {
        this.props.navigation.closeDrawer();
        this.props.navigation.navigate('NewList');
    }

    render() {
        return (
        <ScrollView>
            <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
                    <Text style={styles.label}>
                        My Lists
                    </Text>
                    <View
                            style={{
                            borderBottomColor: '#ccc',
                            borderBottomWidth: 1,
                            }}
                        />
                {this.props.lists.map((l) => {
                    return (
                        <Text
                            style={styles.list}
                            key={l._id}
                            onPress={() => this.rehydrateListView(l)}
                        >
                            {l.name}
                        </Text>
                    )
                })}
                {this.props.lists.length === 0 &&
                    <View style={styles.list}>
                        <Text>You do not currently have any shopping lists</Text>
                        <View style={styles.list}></View>
                        <Button block primary onPress={this.newList}>
                            <Text style={{color: '#fff'}}>New List</Text>
                        </Button>
                    </View>
                }
            </SafeAreaView>
        </ScrollView>
        )
    }
}

const ReduxDrawer = connect(
    (state) => {
        return { lists: state.listReducer.lists }
    },
    (dispatch) => {
        return {
            setCurrentList: (list) => dispatch(setCurrentList(list))
        }
    },
)(withNavigation(CustomDrawerContentComponent))


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
      list: {
        margin: 16,
      },
});
