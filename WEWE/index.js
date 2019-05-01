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
import login from './login.js';

const navigator = createStackNavigator({
    'login': login, 
    'edituser': EditUser,
    'userlistedit': UserListEdit,
    
}, {headerMode: 'none'})

const app = createAppContainer(navigator);

AppRegistry.registerComponent(appName, () => app);
