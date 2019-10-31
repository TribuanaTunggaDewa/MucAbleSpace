/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import checkinScreen from './src/screens/checkinScreen'
import customerScreen from './src/screens/customerScreen'
import roomScreen from './src/screens/roomScreen'
import settingScreen from './src/screens/settingScreen'
import loginScreen from './src/screens/loginScreen'
import { Provider } from 'react-redux'
import store from './src/_redux/store'
import Icon from 'react-native-vector-icons/Feather'

const tabContainer = createBottomTabNavigator({
  Checkin : {
    screen: checkinScreen,
    navigationOptions:{
      tabBarLabel: 'Checkin',
      tabBarIcon: ({tintColor}) => <Icon name='check-circle' size={30} color={tintColor} />,
      tabBarOptions:{
        activeTintColor: 'white',
        inactiveBackgroundColor: '#757575',
        activeBackgroundColor: '#D7CCC8'
      }
      
    }
  },
  Customer: {
    screen: customerScreen,
    navigationOptions:{
      tabBarLabel: 'Customer',
      tabBarIcon: ({tintColor}) => <Icon name='users' size={30} color={tintColor} />,
      tabBarOptions:{
        activeTintColor: 'white',
        inactiveBackgroundColor: '#757575',
        activeBackgroundColor: '#D7CCC8'
      }
      
    }
  },
  Room    : {
    screen: roomScreen,
    navigationOptions:{
      tabBarLabel: 'Room',
      tabBarIcon: ({tintColor}) => <Icon name='box' size={30} color={tintColor} />,
      tabBarOptions:{
        activeTintColor: 'white',
        inactiveBackgroundColor: '#757575',
        activeBackgroundColor: '#D7CCC8'
      }
      
    }
  },
  Setting : {
    screen: settingScreen,
    navigationOptions:{
      tabBarLabel: 'Setting',
      tabBarIcon: ({tintColor}) => <Icon name='settings' size={30} color={tintColor} />,
      tabBarOptions:{
        activeTintColor: 'white',
        inactiveBackgroundColor: '#757575',
        activeBackgroundColor: '#D7CCC8'
      }
      
    }
  }
})

const switchContainer = createSwitchNavigator({
    Checkin: tabContainer,
    login: loginScreen,
},{
  initialRouteName: 'login'
})

const AppContainer = createAppContainer(switchContainer)


class App extends Component {


  render(){
    return(
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}


const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
