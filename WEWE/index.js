/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

import App from './App';
import UserList from './UserList';
import UserListEdit from './UserListEdit.js';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import EditUser from './EditUser.js';

const navigator = createStackNavigator({
    'userlist': UserListEdit,
    'edituser': EditUser,
})

const app = createAppContainer(navigator);

AppRegistry.registerComponent(appName, () => app);
