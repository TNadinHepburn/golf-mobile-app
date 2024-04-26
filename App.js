import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';

import Home from './screens/Home';
import Scorecard from './screens/Scorecard';
import ScorecardHistory from './screens/ScorecardHistory';
import ScorecardView from './screens/ScorecardView';
import SwingRecorder from './screens/SwingRecorder';
import SwingRecorderHistory from './screens/SwingRecorderHistory';
import ShotTracker from './screens/ShotTracker';
import ShotTrackerHistory from './screens/ShotTrackerHistory';
import * as Location from 'expo-location';
Location.installWebGeolocationPolyfill();

export default function App() {
     
  const HomeStack = () => {
    const Stack = createStackNavigator();
    return (
     <Stack.Navigator>
         <Stack.Screen name="Home" component={Home}></Stack.Screen>
         <Stack.Screen name="Scorecard" component={Scorecard}></Stack.Screen>
         <Stack.Screen name="ScorecardHistory" component={ScorecardHistory}></Stack.Screen>
         <Stack.Screen name="ScorecardView" component={ScorecardView}></Stack.Screen>
         <Stack.Screen name="SwingRecorder" component={SwingRecorder}></Stack.Screen>
         <Stack.Screen name="SwingRecorderHistory" component={SwingRecorderHistory}></Stack.Screen>
         <Stack.Screen name="ShotTracker" component={ShotTracker}></Stack.Screen>
         <Stack.Screen name="ShotTrackerHistory" component={ShotTrackerHistory}></Stack.Screen>
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
