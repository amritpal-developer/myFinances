import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import { store } from './src/dataManagement/store';
import { PaperProvider } from 'react-native-paper';
import { ThemeProvider, useTheme } from './src/utils/ThemeProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const AppWithTheme = () => {
  const { theme } = useTheme();
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
};
const Root = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <Provider store={store}>
      <ThemeProvider>
        <AppWithTheme />
      </ThemeProvider>
    </Provider>
  </GestureHandlerRootView>
);
AppRegistry.registerComponent(appName, () => Root);
