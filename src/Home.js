import 'react-native-gesture-handler';

import React, { Component } from 'react';
import { StyleSheet, Text, View, ToastAndroid, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from './Header';
import Location from './Location';
import { FlatList, ScrollView } from 'react-native-gesture-handler';



   class Home extends Component {
     constructor(props){
       super(props);

       this.state = {
         isLoading: true,
         locations: null,
         location_id: null
       }
     }
  

    componentDidMount(){
        this.getData()
    }

    getData = async () => {
      const value = await AsyncStorage.getItem('@session_token');
      return fetch("http://10.0.2.2:3333/api/1.0.0/find", {
        'headers': {
          'X-Authorization': value
        }
      })
      .then((response) => {
        if(response.status === 200){
          return response.json()
        } else {
          throw 'Something went wrong';
        }
      })
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          locations: responseJson
        });
      })
      .catch((error) => {
          console.log(error);
          ToastAndroid.show(error, ToastAndroid.SHORT);
      })
    }

  render(){

    const navigation = this.props.navigation;

    if(this.state.isLoading){
      return (
          <View>
              <Text style={styles.loading}>Loading...</Text>
          </View>
      )
  } else {
    return (
      <View style={styles.container}>
        <Header />
        <Text style={styles.title}>Find the best local coffee shops</Text>
        <FlatList
         data={this.state.locations}
         renderItem={({item}) => (
          <TouchableOpacity onPress={() => navigation.navigate('Info', {location_id: item.location_id})}>
           <View style={{padding: 20}}>
             <Text style={styles.locationInfo}>{item.location_name}</Text>
             <Text style={styles.rating}>Rating: {item.avg_overall_rating}</Text>
           </View>
          </TouchableOpacity>  
         )}
         keyExtractor={(item) => item.location_id.toString()}
        />
      </View>
    )
    }
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
    fontSize: 17,
    textAlign: 'left',
    marginLeft: 50,
    fontFamily: 'Roboto'
},

loading: {
  textAlign: 'center',
  marginTop: 280,
  fontSize: 20
}

})


export default Home