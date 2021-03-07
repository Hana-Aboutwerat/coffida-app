import 'react-native-gesture-handler';

import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Logo from './Images/Logo.png'

  class Header extends Component {
  render(){
    return (
      <View style={styles.header}>
          <Image 
            style={{width: 60, height: 60, }}
            source={require('./Images/Logo.png')}
          />
          <Text style={styles.headerText}>Coffida</Text>
      </View>
    )
  };
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '12%',
    alignItems: 'center',
    backgroundColor: '#63ace1',

  },

  headerText: {
    fontSize: 25,
    color: '#F8F8FF',
  },

  
})


export default Header