import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {Text, View, StyleSheet, ToastAndroid, TouchableOpacity, TextInput, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Rating, AirbnbRating} from 'react-native-elements';

import Header from './Header';
import { ScrollView } from 'react-native-gesture-handler';

class Review extends Component {
    constructor(props){
        super(props);
  
        this.state = {
         isLoading: true,
         overall_rating: 0,
         price_rating: 0,
         quality_rating: 0,
         clenliness_rating: 0,
         review_body: "",
        }
      }


      ratingCompleted(rating, name) {
        let stateObject = () => {
          let returnObj = {};
          returnObj[name] = rating;
          return returnObj;
        };
        this.setState(stateObject);
      }

      addReview = async () => {
        
        let to_send = {
          overall_rating: this.state.overall_rating,
          price_rating: this.state.price_rating,
          quality_rating: this.state.quality_rating,
          clenliness_rating: this.state.clenliness_rating,
          review_body: this.state.review_body
        };
        const value = await AsyncStorage.getItem('@session_token');
        const loc_id = this.props.route.params.location_id;
        return fetch ('http://10.0.2.2:3333/api/1.0.0/location/' + loc_id + '/review' ,{
          method: 'post',
          headers: {
            'Content-type': 'application/json',
            'X-Authorization': value
          },
          body: JSON.stringify(to_send)
        })
        .then((response) => {
          if(response.status === 201){
            Alert.alert("Thank you for your review!");
          } else if(response.status === 400){
            throw 'Bad Request';
          } else if(response.status === 401){
            throw 'Unauthorised'
          } else if(response.status === 404){
            throw 'Not found'
          } else if(response.status === 500){
            throw 'Server Error'
          }
        })
        .then((response) => {
          this.props.navigation.navigate('Home');
        })
        .catch ((error) =>  {
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT);
      })
    
    }


  render(){
    const location_name = this.props.route.params.location_name;
    return (
    <View style={styles.container}>
    <Header />
    <ScrollView>
    <Text style={styles.title}>Reviewing {location_name}</Text>
    <View style={styles.ratingSpace}>
    <Text style={styles.myReview}>Overall Rating: </Text>
    <AirbnbRating
        size={25}
        maxStars={5}
        defaultRating={0}
        reviewSize= {22}
        onFinishRating={(rating) => this.ratingCompleted(rating, "overall_rating")}
      />
    </View>

    <View style={styles.ratingSpace}>
    <Text style={styles.myReview}>Price Rating: </Text>
    <AirbnbRating
        size={25}
        maxStars={5}
        defaultRating={0}
        reviewSize= {22}
        onFinishRating={(rating) => this.ratingCompleted(rating, "price_rating")}
      />
      </View>

    <View style={styles.ratingSpace}>
    <Text style={styles.myReview}>Quality Rating: </Text>
    <AirbnbRating
        size={25}
        maxStars={5}
        defaultRating={0}
        reviewSize= {22}
        onFinishRating={(rating) => this.ratingCompleted(rating, "quality_rating")}
      />
      </View>

    <View style={styles.ratingSpace}>
    <Text style={styles.myReview}>Cleanliness: </Text>
    <AirbnbRating
        size={25}
        maxStars={5}
        defaultRating={0}
        reviewSize= {22}
        onFinishRating={(rating) => this.ratingCompleted(rating, "clenliness_rating")}
      />
    </View>

    <Text style={styles.Comment}>Comment: </Text>
    <TextInput 
    style={styles.comment} 
    placeholder="Add Comment ..."
    onChangeText={(review_body) => this.setState({review_body: review_body})}
    />

    <TouchableOpacity
          onPress={() => this.addReview()} >
          <Text style={styles.submitButton}>Submit</Text>        
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
  
  myReview: {
    color: '#696969',
    fontSize: 20,
    textAlign: 'left',
    marginLeft: 120,
    marginTop: 10,
    fontFamily: 'Roboto',
    fontWeight: 'bold'
  },

  rating: {
    width: 50,
    height: 50,
    backgroundColor: '#F8F8FF',
    borderColor: '#63ace1',
    borderWidth: 2,
    borderRadius: 5,
    marginTop: 12,
    marginLeft: 30,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#a6a6a6',
    fontSize: 18
  },

  comment: {
    width: 300,
    height: 130,
    backgroundColor: '#F8F8FF',
    borderColor: '#63ace1',
    borderWidth: 2,
    borderRadius: 5,
    marginTop: 12,
    marginLeft: 30,
    marginBottom: 25,
    paddingHorizontal: 12,
    color: '#a6a6a6',
    fontSize: 18
  },

  submitButton: {
    width: 130,
    backgroundColor: '#63ace1',
    color: '#F8F8FF',
    paddingTop: 12,
    paddingBottom: 12,
    textAlign:'center',
    fontSize: 20,
    borderRadius: 5,
    marginLeft: 40,
    marginBottom: 30

  },
 
  ratingSpace: {
    marginBottom: 40,
    backgroundColor: '#f2f2f2',
    padding: 20
  },

  Comment: {
    color: '#696969',
    fontSize: 20,
    textAlign: 'left',
    marginLeft: 50,
    marginTop: 10,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    marginBottom: 6
  }

  
  })

export default Review