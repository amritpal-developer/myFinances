import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import { store } from './src/dataManagement/store';
import { PaperProvider } from 'react-native-paper';
import { ThemeProvider, useTheme } from './src/utils/ThemeProvider';

const AppWithTheme = () => {
  const { theme } = useTheme();
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
};

const Root = () => (
  <Provider store={store}>
    <ThemeProvider>
      <AppWithTheme />
    </ThemeProvider>
  </Provider>
);

AppRegistry.registerComponent(appName, () => Root);
