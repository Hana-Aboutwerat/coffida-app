import 'react-native-gesture-handler';

import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from './Header';


   class Profile extends Component {
    constructor(props){
      super(props);

      this.state = {
       isLoading: true,
       firstName: '',
       lastName: '',
       email: '',
      }
    }


    componentDidMount(){
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
        this.getInfo();
      });   
    }

    componentWillUnmount(){
      this._unsubscribe();
    }

    getInfo = async () => {
      const id = await AsyncStorage.getItem('@user_id');
      const value = await AsyncStorage.getItem('@session_token');
      return fetch("http://10.0.2.2:3333/api/1.0.0/user/" + id, {
        'headers': {
          'Content-type': 'application/json',
          'X-Authorization': value
        }
      })
      .then((response) => {
        if(response.status === 200){
          return response.json()
        } else if(response.status === 401){
          throw 'Unauthorised';
        }
       else if(response.status === 404){
        throw 'Not found';
       }
       else if(response.status === 500){
       throw 'Server error';
    }
      })
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          firstName: responseJson.first_name,
          lastName: responseJson.last_name,
          email: responseJson.email,
        })
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
        <ScrollView>
        <Text style={styles.profileTitle}>Profile</Text>

        <Text style={styles.info}>{this.state.firstName}</Text>
        <Text style={styles.info}>{this.state.lastName}</Text>
        <Text style={styles.info}>{this.state.email}</Text>
      
        <TouchableOpacity
          onPress={() => navigation.navigate('MyReviews')}>
          <Text style={styles.link2}>My Reviews</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('UpdateInfo')}>
          <Text style={styles.link2}>Update Info</Text>
        </TouchableOpacity>
        </ScrollView>
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

  title2: {
    color: '#388dcb',
    fontSize: 23,
    textAlign: 'left',
    marginTop: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 25,
  },

  profileTitle: {
    color: '#388dcb',
    fontSize: 25,
    textAlign: 'left',
    marginTop: 30,
    fontWeight: 'bold',
    marginLeft: 30
  },

  info: {
    color: 'gray',
    fontSize: 20,
    textAlign: 'left',
    marginTop: 12,
    marginLeft: 30,
  },

  link: {
    textAlign: 'left',
    color: '#388dcb',
    textDecorationLine: 'underline',
    fontSize: 20,
    marginTop: 25,
    marginLeft: 30,
    fontWeight: 'bold',
  },

  link2: {
    textAlign: 'left',
    color: '#388dcb',
    textDecorationLine: 'underline',
    fontSize: 20,
    marginTop: 15,
    marginLeft: 30,
    fontWeight: 'bold',
  },

  loading: {
    textAlign: 'center',
    marginTop: 280,
    fontSize: 20
}

})


export default Profile