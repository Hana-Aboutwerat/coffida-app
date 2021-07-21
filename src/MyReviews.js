import 'react-native-gesture-handler';

import React, { Component } from 'react';
import { StyleSheet, Text, View, ToastAndroid, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from './Header';


   class MyReviews extends Component {

    constructor(props){
      super(props);

      this.state = {
       reviews: null,
       review_id: null
      }
    }


    // componentDidMount(){
    //   this._unsubscribe = this.props.navigation.addListener('focus', () => {
    //     this.getData();
    //   });   
    // }

    // componentWillUnmount(){
    //   this._unsubscribe();
    // }


    getData = async () => {
      const user_id = this.props.route.params.id;
      const value = await AsyncStorage.getItem('@session_token');
      return fetch("http://10.0.2.2:3333/api/1.0.0/user/" + user_id, {
        'headers': {
          'Content-type': 'application/json',
          'X-Authorization': value
        }
      })
      .then((response) => {
        if(response.status === 200){
          return response.json()
        } else if(response.status === 404){
          throw 'Not found';
        } else if(response.status === 401){
          throw 'Unauthorised';
        } else if(response.status === 500){
          throw 'Server Error';
        }
      })
      .then((responseJson) => {
        this.setState({
          reviews: responseJson.reviews
        });
      })
      .catch((error) => {
          console.log(error);
          ToastAndroid.show(error, ToastAndroid.SHORT);
      })
    }



  render(){
    return (
      <View style={styles.container}>
        <Header />
        <Text style={styles.title}>My Reviews</Text>
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
    fontSize: 25,
    textAlign: 'center',
    marginTop: 35,
    fontWeight: 'bold',
    marginBottom: 25
  },

  reviews: {
    marginBottom: 30,
    backgroundColor: '#cce6ff',
    padding: 10,
    borderRadius: 10,
    margin: 20, 
    paddingBottom: 20,
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


export default MyReviews