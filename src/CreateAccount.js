import 'react-native-gesture-handler';

import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Alert, TouchableOpacity } from 'react-native';

import Header from './Header';

  class CreateAccount extends Component {
    constructor(props) {
      super(props)

      this.state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      }
    }


   addUser(){
    let to_send = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    };

    return fetch('http://10.0.2.2:3333/api/1.0.0/user', {
        method: 'post',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(to_send)
      })
      .then((response) => {
        Alert.alert("Account created successfully");
      })
      .then((response) => {
        this.props.navigation.navigate('Login');
      })
      .catch ((error) =>  {
      console.log(error);
    })
  
  }
    
  
  render(){
    
    const navigation = this.props.navigation;

    return (
      <View style={styles.container}>
        <Header />
        <ScrollView>
        <Text style={styles.title}>Create account</Text>
        <TextInput  
         style={styles.inputBox}
         placeholder='First Name' 
         onChangeText={(firstName) => this.setState({firstName})} 
         value={this.state.firstName} />

        <TextInput
          style={styles.inputBox}
           placeholder='Last Name' 
           onChangeText={(lastName) => this.setState({lastName})}
            value={this.state.lastName}/>

        <TextInput
          style={styles.inputBox} 
          placeholder='Email' 
          onChangeText={(email) => this.setState({email})} 
          value={this.state.email}/>

        <TextInput  
          style={styles.inputBox} 
          placeholder='Password'
           secureTextEntry={true} 
           onChangeText={(password) => this.setState({password})} 
           value={this.state.password}/>

        <TouchableOpacity
          onPress={() => this.addUser()} >
          <Text style={styles.submitButton}>Create</Text>        
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.login}>Log in</Text>
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


export default CreateAccount