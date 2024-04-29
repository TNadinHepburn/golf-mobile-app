import * as React from 'react';
import { StyleSheet } from 'react-native';
// import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack'; 
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
     <Stack.Navigator 
      screenOptions={{
    }}>
         <Stack.Screen options={{ title: "FairwayFinder"}} name="Home" component={Home}></Stack.Screen>
         <Stack.Screen options={{ title: "Play Round"}} name="Scorecard" component={Scorecard}></Stack.Screen>
         <Stack.Screen options={{ title: "Previous Rounds"}} name="ScorecardHistory" component={ScorecardHistory}></Stack.Screen>
         <Stack.Screen options={{ title: "Round Summary"}} name="ScorecardView" component={ScorecardView}></Stack.Screen>
         <Stack.Screen options={{ title: "Record Swing"}} name="SwingRecorder" component={SwingRecorder}></Stack.Screen>
         <Stack.Screen options={{ title: "View recorded swings"}} name="SwingRecorderHistory" component={SwingRecorderHistory}></Stack.Screen>
         <Stack.Screen options={{ title: "Track a Shot"}} name="ShotTracker" component={ShotTracker}></Stack.Screen>
         <Stack.Screen options={{ title: "Tracked Shots"}} name="ShotTrackerHistory" component={ShotTrackerHistory}></Stack.Screen>
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
