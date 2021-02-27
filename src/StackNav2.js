import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';


import Home from './Home';
import Location from './Location';
import Review from './Review';



const Stack = createStackNavigator();

class StackNav2 extends Component {
  
  render(){
    return ( 
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
          <Stack.Screen name="Info" component={Location} />
          <Stack.Screen name="Review" component={Review} />
        </Stack.Navigator> 
    )
  };
}


export default StackNav2