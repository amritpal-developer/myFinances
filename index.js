/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import { store } from './src/dataManagement/store';
import { MD2LightTheme, PaperProvider } from 'react-native-paper';
const theme = {
  ...MD2LightTheme,

  // Specify a custom property
  custom: 'property',

  // Specify a custom nested property
  colors: {
    ...MD2LightTheme.colors,
    primary: '#fefefe',
  },
};

const Root = () => (
  
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    </Provider>
  );
AppRegistry.registerComponent(appName, () => Root);
