import 'react-native-gesture-handler';

import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity} from 'react-native';

import Header from './Header';


   class MyReviews extends Component {

  render(){

    const navigation = this.props.navigation;

    return (
      <View style={styles.container}>
        <Header />
        <Text>My Reviews</Text>
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

  logout: {
    textAlign: 'left',
    color: '#737373',
    textDecorationLine: 'underline',
    fontSize: 20,
    marginTop: 20,
    marginLeft: 20,
  }


})


export default MyReviews