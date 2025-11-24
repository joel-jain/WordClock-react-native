import { AppRegistry } from 'react-native';
import { registerWidgetTaskHandler } from 'react-native-android-widget';
import { widgetTaskHandler } from './src/widgetTaskHandler';
import App from './App';
registerWidgetTaskHandler(widgetTaskHandler);
AppRegistry.registerComponent('main', () => App);
