import 'react-native-gesture-handler';

import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

  class Header extends Component {
  render(){
    return (
      <View style={styles.header}>
          <Text style={styles.headerText}>Coffida</Text>
      </View>
    )
  };
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '12%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#63ace1',

  },

  headerText: {
    fontSize: 25,
    color: '#F8F8FF',
  },

  
})


export default Header