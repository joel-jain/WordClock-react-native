import { registerRootComponent } from 'expo';
import { registerWidgetTaskHandler } from 'react-native-android-widget';
import { widgetTaskHandler } from './src/WidgetTaskHandler';
import { AppRegistry } from 'react-native';
import App from './App';

registerWidgetTaskHandler(widgetTaskHandler); 
// Register the widget handler
registerWidgetTaskHandler(widgetTaskHandler);

AppRegistry.registerComponent('main', () => App);