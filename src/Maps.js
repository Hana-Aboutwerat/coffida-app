import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {Text, View, StyleSheet, ToastAndroid, TouchableOpacity} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

import Header from './Header';
import { ScrollView } from 'react-native-gesture-handler';

class Maps extends Component {
    constructor(props){
        super(props);
  
        this.state = {
         isLoading: true,
         location_name: '',
         location: {
          latitude: 0.00,
          longitude: 0.00   
         }
        }
      }

      componentDidMount(){
        this.getData();
      }


  getData = async () => {
    const loc_id = this.props.route.params.location_id;
    return fetch("http://10.0.2.2:3333/api/1.0.0/location/" + loc_id, {
      'headers': {
        'Content-type': 'application/json'
      }
    })
    .then((response) => {
      if(response.status === 200){
        return response.json()
      } else if(response.status === 404){
        throw 'Not found';
      } 
    })
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        location_name: responseJson.location_name,
        location: {
          latitude: responseJson.latitude,
          longitude: responseJson.longitude   
        }  
      });
    })
    .catch((error) => {
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT);
    })
  }


  render(){
    if(this.state.isLoading){
        return (
            <View>
                <Text style={styles.loading}>Loading...</Text>
            </View>
        )
    } else {
        return(
            <View style={styles.container}>
                <Header />
                <MapView
                   provider={PROVIDER_GOOGLE}
                   style={styles.map}
                   region={{
                       latitude: this.state.location.latitude,
                       longitude: this.state.location.longitude,
                       latitudeDelta: 0.002,
                       longitudeDelta: 0.002
                   }}
                >
                 
                <Marker
                 coordinate={this.state.location}
                 title={this.state.location_name}
                 />
                </MapView>
            </View>
        )
    }
    
  }

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

  link: {
    textAlign: 'left',
    color: '#388dcb',
    textDecorationLine: 'underline',
    fontSize: 18,
    marginTop: 10,
    marginLeft: 70,
    fontWeight: 'bold',
  },

  map: {
    flex: 1,
  },

  loading: {
      textAlign: 'center',
      marginTop: 240,
      fontSize: 20

  }
  
  })


export default Maps