import 'react-native-gesture-handler';

import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from './Header';

   class Login extends Component {
     constructor(props){
       super(props);

       this.state = {
         email: "",
         password: ""
       }
     }

     login = async () => {

      return fetch('http://10.0.2.2:3333/api/1.0.0/user/login', {
        method: 'post',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(this.state)
      })
      .then((response) => {
        if(response.status === 200){
          return response.json()
        } else if(response.status === 400){
          throw 'Invalid email or password';
        } else {
          throw 'Something went wrong'
        }
      })
      .then(async (responseJson) => {
        console.log(responseJson);
        await AsyncStorage.setItem('@session_token', responseJson.token);
        await AsyncStorage.setItem('@user_id', JSON.stringify(responseJson.id)); 
        this.props.navigation.navigate("Nav");
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT);
      })
     }

  render(){

    const navigation = this.props.navigation;

    return (
      <View style={styles.container}>
        <Header />
        <ScrollView>
        <Text style={styles.title}>Log in</Text>
        <TextInput style={styles.inputBox} placeholder='Email' onChangeText={(email) => this.setState({email})} value={this.state.email}/>
        <TextInput style={styles.inputBox} placeholder='Password' secureTextEntry={true} onChangeText={(password) => this.setState({password})} value={this.state.password} />
        <TouchableOpacity
          onPress={() => this.login()} >
          <Text style={styles.submitButton}>Log in</Text>
        </TouchableOpacity>
        </ScrollView>
      </View>
    )
  };
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8FF'
  },

  title: {
    color: '#388dcb',
    fontSize: 25,
    textAlign: 'center',
    marginTop: 35,
    fontWeight: 'bold',
    marginBottom: 25
  },

  inputBox: {
    width: 250,
    backgroundColor: '#F8F8FF',
    borderColor: '#63ace1',
    borderWidth: 2,
    borderRadius: 5,
    marginTop: 12,
    marginLeft: 83,
    paddingHorizontal: 16,
    color: '#a6a6a6',
    fontSize: 18

  },

  submitButton: {
    width: 130,
    backgroundColor: '#63ace1',
    color: '#F8F8FF',
    paddingTop: 10,
    paddingBottom: 10,
    textAlign:'center',
    fontSize: 20,
    borderRadius: 5,
    marginTop: 25,
    marginLeft: 140

  },

  login: {
    textAlign: 'center',
    color: '#737373',
    textDecorationLine: 'underline',
    fontSize: 18,
    marginTop: 10
  }

})


export default Login