import 'react-native-gesture-handler';

import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TextInput, ScrollView, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';


import CreateAccount from './src/CreateAccount';
import Login from './src/Login';


const Stack = createStackNavigator();

class App extends Component {
  
  render(){
    return ( 
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Create Account" component={CreateAccount} />
          <Stack.Screen name="Log in" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>  
    )
  };
}


export default App