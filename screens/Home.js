import { StyleSheet, Text, View, Button } from 'react-native';
import { useState, useEffect  } from 'react';

export default function Home({ navigation }) {

return (
  <View style={styles.container}>
    <View style={styles.cards}>
      <Button
        title="Previous Rounds"
        onPress={() => navigation.navigate("ScorecardHistory")}/>
      <Button
        title="Tracked Shots"
        onPress={() => navigation.navigate("ShotTrackerHistory")}/>
      <Button
        title="Recorded Swings"
        onPress={() => navigation.navigate("SwingRecorderHistory")}/>
    </View>
    <View style={styles.buttonContainer}>
        <Button 
          title="Scorecard"
          onPress={() => navigation.navigate("Scorecard")}>
            Scorecard
        </Button>
        <Button 
          title="ShotTracker"
          onPress={() => navigation.navigate("ShotTracker")}>
            Track Shot
        </Button>
        <Button 
          title="SwingRecorder"
          onPress={() => navigation.navigate("SwingRecorder")}>
            Record Swing
        </Button>
    </View>
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  cards: {
    flex: 1,
    flexDirection: 'collumn',
  },
});