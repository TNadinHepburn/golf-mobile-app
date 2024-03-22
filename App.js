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

export default function App() {

  const ScorecardStack = () => {
    const Stack = createStackNavigator();
    return (
     <Stack.Navigator  options={{tabBarLabel: "Scorecard"}}>
         <Stack.Screen name="Scorecard" component={Scorecard}></Stack.Screen>
         <Stack.Screen name="SwingRecorder" component={SwingRecorder}></Stack.Screen>
         <Stack.Screen name="ShotTracker" component={ShotTracker}></Stack.Screen>
     </Stack.Navigator>
    );
  }
  
  const TabNav = () => {
    const Tab = createBottomTabNavigator();
    return (
      <Tab.Navigator >
        <Tab.Screen 
          name="Home" 
          component={Home} 
          options={{
            tabBarLabel: 'Home',
            }}/>
        <Tab.Screen 
          name="ScorecardStack" 
          component={ScorecardStack} 
          />
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
  const HomeStack = () => {
    const Stack = createStackNavigator();
    return (
     <Stack.Navigator>
         <Stack.Screen name="Home" component={Home}></Stack.Screen>
         <Stack.Screen name="Scorecard" component={Scorecard}></Stack.Screen>
         <Stack.Screen name="SwingRecorder" component={SwingRecorder}></Stack.Screen>
         <Stack.Screen name="ShotTracker" component={ShotTracker}></Stack.Screen>
     </Stack.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <HomeStack />
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
