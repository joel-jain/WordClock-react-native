import { registerRootComponent } from 'expo';
import { registerWidgetTaskHandler } from 'react-native-android-widget';
import { widgetTaskHandler } from './src/widgetTaskHandler';
import { AppRegistry } from 'react-native';
import App from './App';

registerWidgetTaskHandler(widgetTaskHandler); 
// Register the widget handler
AppRegistry.registerComponent('main', () => App);