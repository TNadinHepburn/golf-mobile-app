import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';

import Home from './screens/Home';
import Scorecard from './screens/Scorecard';
import SwingRecorder from './screens/SwingRecorder';
import ShotTracker from './screens/ShotTracker';


const TabNav = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Home" 
        component={Home} 
        options={{
          tabBarLabel: 'Home',
          }}/>
      <Tab.Screen 
        name="Scorecard" 
        component={Scorecard} 
        options={{
          tabBarLabel: 'Start Round',
          }}/>
      <Tab.Screen 
        name="SwingRecorder" 
        component={SwingRecorder}
        options={{
        tabBarLabel: 'Record Swing',
      }}/>
      <Tab.Screen 
        name="ShotTracker" 
        component={ShotTracker}
        options={{
        tabBarLabel: 'Track Shot',
      }}/>
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <TabNav />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
