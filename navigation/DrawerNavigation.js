import { createDrawerNavigator } from 'react-navigation'
import MainTabNavigator from './MainTabNavigator';
import ListStack from './ListNavigator';


// Manifest of possible screens
const DrawerNavigation = createDrawerNavigator({
    List: { screen: MainTabNavigator},
    'New List': { screen: ListStack}
})

export default DrawerNavigation
