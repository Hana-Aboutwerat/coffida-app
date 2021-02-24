import 'react-native-gesture-handler';

import React, {Component} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from "react-native-vector-icons/Ionicons";




import Home from './Home';
import Settings from './Settings';
import StackNav from './StackNav';

const Tab = createBottomTabNavigator();

class Nav extends Component {
  
    render(){
      return ( 
       <Tab.Navigator
           screenOptions={({route}) => ({
               tabBarIcon: ({focused, color, size}) => {
                   let iconName;

                   if (route.name === 'Home') {
                       iconName = focused ? 'home' : 'home-outline';
                   } else if (route.name === 'Profile') {
                    iconName = focused ? 'person' : 'person-outline';
                   } else if (route.name === 'Settings') {
                    iconName = focused ? 'settings' : 'settings-outline';
               }

               return <Ionicons name={iconName} size={size} color={color} />;

                },
           
            })}

             tabBarOptions={{
               activeTintColor: '#63ace1',
               inactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Profile" component={StackNav} />
            <Tab.Screen name="Settings" component={Settings} />
          </Tab.Navigator>  
      )
    };
  }
  
  
  export default Nav