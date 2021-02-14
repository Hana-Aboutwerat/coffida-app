import {CreateAppContainer} from "react-navigation";
import {reactMaterialTopTabNavigator} from "react-navigation-tabs";
import {createStackNavigator} from '@react-navigation/stack';
import Icon from "react-native-vector-icons/Ionicons";
import {StyleSheet, Text, View} from 'react-native';

import Home from './Home';
import Profile from './Profile';
import Settings from './Settings';

const Tabs = createMaterialTopTabNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: {
                tabBarLabel: ({}) => {
                    <View style={StyleSheet.iconContainer}>
                    <Icon name="home" color="#fff" size={22} />
                    <Text style={{color: '#fff'}}>Home</Text>
                    </View>
                },
            },
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                tabBarLabel: ({}) => {
                    <View style={StyleSheet.iconContainer}>
                    <Icon name="person" color="#fff" size={22} />
                    <Text style={{color: '#fff'}}>Profile</Text>
                    </View>
                },
            },
        },
        Settings: {
            screen: Settings,
            navigationOptions: {
                tabBarLabel: ({}) => {
                    <View style={StyleSheet.iconContainer}>
                    <Icon name="settings" color="#fff" size={22} />
                    <Text style={{color: '#fff'}}>Settings</Text>
                    </View>
                },
            },
        },

    },

    {}, 
);

const mainScreenNavigator = 

const styles = StyleSheet.create({
    iconContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
    },
  
  
  })