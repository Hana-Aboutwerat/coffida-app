import 'react-native-gesture-handler';

import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';


import CreateAccount from './src/CreateAccount';
import Login from './src/Login';
import Nav from './src/Nav';


const Stack = createStackNavigator();

class App extends Component {
  
  render(){
    return ( 
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="CreateAccount" component={CreateAccount} options={{headerShown: false}} />
          <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
          <Stack.Screen name="Nav" component={Nav} options={{headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>  
    )
  };
}


export default App