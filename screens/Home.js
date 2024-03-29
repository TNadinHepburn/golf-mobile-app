import { StyleSheet, Text, View, Button } from 'react-native';
import { useState, useEffect  } from 'react';

export default function Home({ navigation }) {

return (
  <View style={styles.container}>
    <Text>Home</Text>
    <View style={styles.buttonContainer}>
        <Button 
          title="Scorecard"
          onPress={() => navigation.navigate("Scorecard")}>
            Scorecard
        </Button>
        <Button 
          title="SwingRecorder"
          onPress={() => navigation.navigate("SwingRecorder")}>
            Record Swing
        </Button>
        <Button 
          title="ShotTracker"
          onPress={() => navigation.navigate("ShotTracker")}>
            Track Shot
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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
});