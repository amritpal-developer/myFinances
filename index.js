/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {store} from './src/dataManagement/store';
import {useTheme, PaperProvider} from 'react-native-paper';
import {ThemeProvider} from './src/utils/ThemeProvider';

const Root = () => {
  const {theme} = useTheme();
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </PaperProvider>
    </Provider>
  );
};
AppRegistry.registerComponent(appName, () => Root);
