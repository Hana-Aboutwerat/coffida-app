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
         location_name: '',
        }
      }



  render(){
    const location_name = this.props.route.params.location_name;
    return (
    <View style={styles.container}>
    <Header />
    <ScrollView>
    <Text style={styles.title}>Reviewing {location_name}</Text>
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
      fontSize: 21,
      textAlign: 'center',
      marginTop: 35,
      fontWeight: 'bold',
      marginBottom: 15
    },
  
    locationInfo: {
        color: '#666666',
        fontSize: 20,
        textAlign: 'left',
        marginLeft: 47,
        fontWeight: 'bold'
    },
  
    rating: {
      color: '#696969',
      fontSize: 18,
      textAlign: 'left',
      marginLeft: 50,
      marginTop: 10,
      fontFamily: 'Roboto'
  },
  
  
  })

export default Review