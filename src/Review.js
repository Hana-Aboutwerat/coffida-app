import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {Text, View, StyleSheet, ToastAndroid, TouchableOpacity} from 'react-native';

import Header from './Header';
import { ScrollView } from 'react-native-gesture-handler';

class Review extends Component {
    constructor(props){
        super(props);
  
        this.state = {
         isLoading: true,
        
        }
      }



  render(){
    return (
    <View style={styles.container}>
    <Header />
    <ScrollView>

    </ScrollView>
    </View>
    )
  };
    
}


export default Review