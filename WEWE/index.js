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
import movies from './movies.js';
import series from './series.js';
import search from './search.js';

const navigator = createStackNavigator({
    'login': login, 
    'edituser': EditUser,
    'userlistedit': UserListEdit,
    'movies': movies,
    'series': series,
    'search': search,
    
}, {headerMode: 'none'})

const app = createAppContainer(navigator);

AppRegistry.registerComponent(appName, () => app);
