import 'react-native-gesture-handler';

import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, ToastAndroid, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from './Header';

   class UpdateInfo extends Component {
    constructor(props) {
        super(props)
  
        this.state = {
          firstName: '',
          lastName: '',
          email: '',
          password: ''
        }
      }
  
      updateFirstName = async () => {
        let to_send = {
          first_name: this.state.firstName
        };
    
        const ID = await AsyncStorage.getItem('@user_id');
        const id = JSON.parse(ID);
        const value = await AsyncStorage.getItem('@session_token');
        return fetch("http://10.0.2.2:3333/api/1.0.0/user/" + id, {
          method: 'patch',
          headers: {
          'Content-type': 'application/json',
          'X-Authorization': value
        },
        body: JSON.stringify(to_send)
      })
       .then((response) => {
          Alert.alert("First Name updated successfully");
        })
        .catch ((error) =>  {
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT);
        })
      
      }

      updateLastName = async () => {
        let to_send = {
          last_name: this.state.lastName
        };
    
        const ID = await AsyncStorage.getItem('@user_id');
        const id = JSON.parse(ID);
        const value = await AsyncStorage.getItem('@session_token');
        return fetch("http://10.0.2.2:3333/api/1.0.0/user/" + id, {
          method: 'patch',
          headers: {
          'Content-type': 'application/json',
          'X-Authorization': value
        },
        body: JSON.stringify(to_send)
      })
          .then((response) => {
            Alert.alert("Last Name updated successfully");
          })
          .catch ((error) =>  {
          console.log(error);
        })
      
      }

      updateEmail = async () => {
        let to_send = {
          email: this.state.email
        };
    
        const ID = await AsyncStorage.getItem('@user_id');
        const id = JSON.parse(ID);
        const value = await AsyncStorage.getItem('@session_token');
        return fetch("http://10.0.2.2:3333/api/1.0.0/user/" + id, {
          method: 'patch',
          headers: {
          'Content-type': 'application/json',
          'X-Authorization': value
        },
        body: JSON.stringify(to_send)
      })
          .then((response) => {
            Alert.alert("Email updated successfully");
          })
          .catch ((error) =>  {
          console.log(error);
        })
      
      }

      updatePassword = async () => {
        let to_send = {
          password: this.state.password
        };
    
        const ID = await AsyncStorage.getItem('@user_id');
        const id = JSON.parse(ID);
        const value = await AsyncStorage.getItem('@session_token');
        return fetch("http://10.0.2.2:3333/api/1.0.0/user/" + id, {
          method: 'patch',
          headers: {
          'Content-type': 'application/json',
          'X-Authorization': value
        },
        body: JSON.stringify(to_send)
      })
          .then((response) => {
            Alert.alert("Password updated successfully");
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
        <Text style={styles.title2}>Update Info</Text>
        <TextInput  style={styles.inputBox2} placeholder='First Name' onChangeText={(firstName) => this.setState({firstName})} value={this.state.firstName}/>
        <TouchableOpacity
          onPress={() => this.updateFirstName()} >
          <Text style={styles.submitButton}>Update</Text>
        </TouchableOpacity>
        <TextInput  style={styles.inputBox2} placeholder='Last Name' onChangeText={(lastName) => this.setState({lastName})} value={this.state.lastName}/>
        <TouchableOpacity
          onPress={() => this.updateLastName()} >
          <Text style={styles.submitButton}>Update</Text>
        </TouchableOpacity>
        <TextInput  style={styles.inputBox2} placeholder='Email' onChangeText={(email) => this.setState({email})} value={this.state.email}/>
        <TouchableOpacity
          onPress={() => this.updateEmail()} >
          <Text style={styles.submitButton}>Update</Text>
        </TouchableOpacity>
        <TextInput style={styles.inputBox2} placeholder='Password' onChangeText={(password) => this.setState({password})} value={this.state.password}/>
        <TouchableOpacity
          onPress={() => this.updatePassword()} >
          <Text style={styles.submitButton}>Update</Text>
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


  title2: {
    color: '#388dcb',
    fontSize: 23,
    textAlign: 'left',
    marginTop: 30,
    fontWeight: 'bold',
    marginBottom: 15,
    marginLeft: 25,
  },

  inputBox2: {
    width: 200,
    backgroundColor: '#F8F8FF',
    borderColor: '#63ace1',
    borderWidth: 2,
    borderRadius: 5,
    marginTop: 6,
    marginTop: 7,
    marginLeft: 25,
    paddingHorizontal: 16,
    color: '#a6a6a6',
    fontSize: 18,

  },

  submitButton: {
    textDecorationLine: 'underline',
    fontSize: 18,
    marginTop: 5,
    marginLeft: 30,
    color: '#388dcb',
    fontWeight: 'bold',
    marginBottom: 8

  },

  login: {
    textAlign: 'center',
    color: '#737373',
    textDecorationLine: 'underline',
    fontSize: 18,
    marginTop: 10
  },

  profileTitle: {
    color: '#388dcb',
    fontSize: 25,
    textAlign: 'left',
    marginTop: 20,
    fontWeight: 'bold',
    marginLeft: 25
  },

  info: {
    color: 'gray',
    fontSize: 19,
    textAlign: 'left',
    marginTop: 12,
    marginLeft: 25
  },

  link: {
    textAlign: 'left',
    color: '#388dcb',
    textDecorationLine: 'underline',
    fontSize: 20,
    marginTop: 10,
    marginLeft: 25,
    fontWeight: 'bold',
  }

})


export default UpdateInfo