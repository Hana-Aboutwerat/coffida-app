import 'react-native-gesture-handler';

import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from './Header';



   class Settings extends Component {

    logout = async () => {
      let token = await AsyncStorage.getItem('@session_token');
      await AsyncStorage.removeItem('@session_token');
      return fetch("http://10.0.2.2:3333/api/1.0.0/user/logout", {
        method: 'post',
        headers: {
          "X-Authorization": token
        }
      })
      .then((response) => {
        if(response.status === 200){
          this.props.navigation.navigate("Login");
        } else if(response.status === 401){
          throw 'Unauthorised'
        }
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
        <TouchableOpacity
          onPress={() => this.logout()} >
          <Text style={styles.submitButton}>Log out</Text>
        </TouchableOpacity>
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
    marginTop: '55%',
    marginLeft: 140

  },




})


export default Settings