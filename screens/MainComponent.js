import CampsiteInfoScreen from './CampsiteInfoScreen';
import DirectoryScreen from './DirectoryScreen';
import { Platform, View } from 'react-native';
import Constants from 'expo-constants';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AboutScreen from './AboutScreen';
import ContactScreen from './ContactScreen';


const AboutStack = createStackNavigator();
const ContactStack = createStackNavigator();

function AboutNavigator() {
    return (
        <AboutStack.Navigator>
            <AboutStack.Screen
                name="About"
                component={AboutScreen}
            />
        </AboutStack.Navigator>
    );
}

function ContactNavigator() {
    return (
        <ContactStack.Navigator>
            <ContactStack.Screen
                name="Contact"
                component={ContactScreen}
                options={{ title: 'Contact Us' }}
            />
        </ContactStack.Navigator>
    );
}



const Drawer = createDrawerNavigator();

const screenOptions = {
    headerStyle: {backgroundColor: '#5637DD'},
    headerTintColor: '#fff'
}

const HomeNavigator = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
                name='Home'
                component={HomeScreen}
                options={{ title: 'Home' }}
            />
        </Stack.Navigator>
    );
}


const DirectoryNavigator = () => {
    const Stack = createStackNavigator();

    return <Stack.Navigator
    initialRouteName='Directory'
    screenOptions={ screenOptions }
>
<Stack.Screen 
name='Directory'
component={DirectoryScreen}
options={{ title: 'Campsite Directory' }}
/>  

<Stack.Screen
name='CampsiteInfo'
component = {CampsiteInfoScreen}
options = {({ route }) => ({
    title: route.params.campsite.name
})}
/>

<Stack.Screen
 name='Home'
 component={HomeScreen}
 options={{ title: 'Home' }}
/>
</Stack.Navigator>
}

const Main = () => {

    return (
        <View style={{ 
            flex: 1, 
            paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight}}>
                <Drawer.Navigator
                initialRouteName= 'Home'
                drawerStyle= {{ backgroundColor: '#CEC8FF' }}
                screenOptions={screenOptions}>

                <Drawer.Screen
                    name='Home'
                    component={HomeNavigator}
                    options={{ title: 'Home' }}
                />

                <Drawer.Screen
                    name='Directory'
                    component={DirectoryNavigator}
                    options={{ title: 'Directory' }}
                />  

                <Drawer.Screen
                name="About"
                component={AboutNavigator}
                options={{ title: 'About Us' }}
                />

                <Drawer.Screen
                name="Contact"
                component={ContactNavigator}
                options={{ title: 'Contact Us' }}
                />


                </Drawer.Navigator>
        </View>
    );
};

export default Main;
