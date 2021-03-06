import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {Text, View, StyleSheet, ToastAndroid, TouchableOpacity, FlatList} from 'react-native';

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
         avg_clenliness_rating: '',
         reviews: null,
         review_id: null
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
            location_id: responseJson.location_id,
            location_name: responseJson.location_name,
            location_town: responseJson.location_town,
            avg_price_rating: responseJson.avg_price_rating,
            avg_quality_rating: responseJson.avg_quality_rating,
            avg_clenliness_rating: responseJson.avg_clenliness_rating,
            reviews: responseJson.location_reviews
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
        <Text style={styles.title}>Location Info</Text>
         <View style={{padding: 20}}>
           <Text style={styles.locationInfo}>{this.state.location_name}</Text>
           <Text style={styles.rating}>Location: {this.state.location_town}</Text>
           <Text style={styles.rating}>Price rating: {Math.round(this.state.avg_price_rating)}</Text>
           <Text style={styles.rating}>Quality rating: {Math.round(this.state.avg_quality_rating)}</Text>
           <Text style={styles.rating}>Cleanliness: {Math.round(this.state.avg_clenliness_rating)}</Text>
           <TouchableOpacity
           onPress={() => navigation.navigate('Maps', {location_id: this.state.location_id})}>
           <Text style={styles.link}>View Map</Text>
           </TouchableOpacity>
           <TouchableOpacity
           onPress={() => navigation.navigate('Reviews', {location_id: this.state.location_id, location_name: this.state.location_name})}>
           <Text style={styles.link}>Reviews</Text>
           </TouchableOpacity>
           <TouchableOpacity
           onPress={() => navigation.navigate('Review', {location_name: this.state.location_name, location_id: this.state.location_id })}>
           <Text style={styles.link}>Write a review</Text>
           </TouchableOpacity>
          </View>
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

  link: {
    textAlign: 'left',
    color: '#388dcb',
    textDecorationLine: 'underline',
    fontSize: 18,
    marginTop: 10,
    marginLeft: 51,
    fontWeight: 'bold',
  },

  
  
  })


export default Location