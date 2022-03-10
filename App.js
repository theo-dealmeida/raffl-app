import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LogBox} from 'react-native';
import StartScreen from "./components/start-screen/StartScreen";
import Feed from "./components/feed/feed";

LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="StartScreen" component={StartScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="Feed" component={Feed} options={{ headerShown: false }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
