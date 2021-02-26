import 'react-native-gesture-handler';

import React, { Component } from 'react';
import { StyleSheet, Text, View, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from './Header';
import { FlatList } from 'react-native-gesture-handler';



   class Home extends Component {
     constructor(props){
       super(props);

       this.state = {
         isLoading: true,
         locations: null
       }
     }
  

    componentDidMount(){
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
        this.getData()
      });   
    }

    componentWillUnmount(){
      this._unsubscribe();
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

    return (
      <View style={styles.container}>
        <Header />
        <Text style={styles.title}>Find the best local coffee shops</Text>
        <FlatList
         data={this.state.locations}
         renderItem={({item}) => (
           <View style={{padding: 20}}>
             <Text style={styles.locationInfo}>{item.location_name}</Text>
             <Text style={styles.rating}>Rating: {item.avg_overall_rating}</Text>
           </View>
         )}
         keyExtractor={(item) => item.location_id.toString()}
        />
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
      color: '#595959',
      fontSize: 20,
      textAlign: 'left',
      marginLeft: 47,
  },

  rating: {
    color: '#696969',
    fontSize: 16,
    textAlign: 'left',
    marginLeft: 50,
},



})


export default Home