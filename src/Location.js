import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {Text, View, StyleSheet, ToastAndroid, TouchableOpacity} from 'react-native';

import Header from './Header';
import { ScrollView } from 'react-native-gesture-handler';

class Location extends Component {
    constructor(props){
        super(props);
  
        this.state = {
         isLoading: true,
         location_id: 0,
         location_name: '',
         location_town: '',
         avg_price_rating: '',
         avg_quality_rating: '',
         avg_clenliness_rating: ''
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
          } else if(response.status === 500){
            throw 'Server Error';
          }
        })
        .then((responseJson) => {
          this.setState({
            isLoading: false,
            location_name: responseJson.location_name,
            location_town: responseJson.location_town,
            avg_price_rating: responseJson.avg_price_rating,
            avg_quality_rating: responseJson.avg_quality_rating,
            avg_clenliness_rating: responseJson.avg_clenliness_rating
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
    <ScrollView>
    <Text style={styles.title}>Location Info</Text>
     <View style={{padding: 20}}>
       <Text style={styles.locationInfo}>{this.state.location_name}</Text>
       <Text style={styles.rating}>Location: {this.state.location_town}</Text>
       <Text style={styles.rating}>Price rating: {this.state.avg_price_rating}</Text>
       <Text style={styles.rating}>Quality rating: {this.state.avg_quality_rating}</Text>
       <Text style={styles.rating}>Cleanliness: {this.state.avg_clenliness_rating}</Text>
     </View> 
     <TouchableOpacity
       onPress={() => navigation.navigate('Review')}>
       <Text>Write a review</Text>
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


export default Location