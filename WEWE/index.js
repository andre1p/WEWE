/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

import App from './App';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import login from './login.js';
import movies from './movies.js';
import series from './series.js';
import search from './search.js';
import celRes from './celRes.js';
import infoMovie from './infoMovie.js';
import infoSerie from './infoSerie.js';

const navigator = createStackNavigator({
    'login': login, 
    'movies': movies,
    'series': series,
    'search': search,
    'celRes': celRes,
    'infoMovie': infoMovie,
    'infoSerie': infoSerie,
    
}, {headerMode: 'none'})

const app = createAppContainer(navigator);

AppRegistry.registerComponent(appName, () => app);
