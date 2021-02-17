import 'react-native-gesture-handler';

import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Image} from 'react-native';

import Header from './Header';


   class Profile extends Component {

  render(){

    const navigation = this.props.navigation;

    return (
      <View style={styles.container}>
        <Header />
        <ScrollView>
        <Text style={styles.profileTitle}>Profile</Text>
        {/* <Image 
          style={{width: 130, height: 130, }}
          source={require('./Images/Profile.png')}
          /> */}
        <Text style={styles.info}>FIRST NAME</Text>
        <Text style={styles.info}>LAST NAME</Text>
        <Text style={styles.info}>EMAIL</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('MyReviews')}>
          <Text style={styles.link}>My Reviews</Text>
        </TouchableOpacity>
        <Text style={styles.title2}>Update Info</Text>
        <TextInput  style={styles.inputBox2} placeholder='First Name' />
        <TextInput  style={styles.inputBox2} placeholder='Last Name' />
        <TextInput  style={styles.inputBox2} placeholder='Email' />
        <TextInput style={styles.inputBox2} placeholder='Password' />
        <TouchableOpacity
          onPress={() => this.update()} >
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
    marginTop: 15,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 25,
  },

  inputBox2: {
    width: 250,
    backgroundColor: '#F8F8FF',
    borderColor: '#63ace1',
    borderWidth: 2,
    borderRadius: 5,
    marginTop: 6,
    marginTop: 7,
    marginLeft: 25,
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
    marginTop: 18,
    marginLeft: 30,
    marginBottom: 10

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


export default Profile