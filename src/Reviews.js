import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {Text, View, StyleSheet, ToastAndroid, TouchableOpacity, FlatList} from 'react-native';

import Header from './Header';

class Reviews extends Component {
  constructor(props){
        super(props);
  
        this.state = {
         isLoading: true,
         location_name: '',
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
            location_name: responseJson.location_name,
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
        const location_name = this.props.route.params.location_name;
        return (
        <View style={styles.container}>
        <Header />
        <Text style={styles.title}>{location_name} Reviews</Text>
           <FlatList
             data={this.state.reviews}
             renderItem={({item}) => (
            <View style={styles.reviews}>
             <Text style={styles.rating}>Overall rating: {item.overall_rating}</Text>
             <Text style={styles.rating}>Price rating: {item.price_rating}</Text>
             <Text style={styles.rating}>Quality rating: {item.quality_rating}</Text>
             <Text style={styles.rating}>Cleanliness: {item.clenliness_rating}</Text>
             <Text style={styles.rating}>Comment: "{item.review_body}."</Text>
            </View>
         )}
         keyExtractor={(item) => item.review_id.toString()}
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

  subHeading: {
    color: '#666666',
    fontSize: 20,
    textAlign: 'left',
    marginLeft: 47,
    fontWeight: 'bold',
    marginTop: 30
  },
  
  reviews: {
      marginBottom: 30,
      backgroundColor: '#cce6ff',
      padding: 10,
      borderRadius: 10,
      margin: 20, 
      paddingBottom: 20,
  }
  
  })


export default Reviews