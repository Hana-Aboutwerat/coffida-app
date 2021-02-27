import 'react-native-gesture-handler';

import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';


import Profile from './Profile';
import MyReviews from './MyReviews';
import UpdateInfo from './UpdateInfo';


const Stack = createStackNavigator();

class StackNav extends Component {
  
  render(){
    return ( 
        <Stack.Navigator>
          <Stack.Screen name="Profile" component={Profile} options={{headerShown: false}} />
          <Stack.Screen name="MyReviews" component={MyReviews} />
          <Stack.Screen name="UpdateInfo" component={UpdateInfo} />
        </Stack.Navigator> 
    )
  };
}


export default StackNav