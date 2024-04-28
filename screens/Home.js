import { StyleSheet, Text, View, Button, Image, Dimensions } from 'react-native';
import { useState, useEffect  } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
const windowWidth = Dimensions.get("window").width;

export default function Home({ navigation }) {

return (
  <View style={styles.container}>
    <View style={styles.cardContainer}>
      <TouchableOpacity 
        style={styles.card}
        onPress={() => navigation.navigate("ScorecardHistory")}>
        {/* <Image style={styles.cardImage} source={require('../assets/previous_rounds.png')} /> */}
          <Text style={styles.mediumText}>Previous Rounds</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("ShotTrackerHistory")}>
          {/* <Image style={styles.cardImage} source={require('../assets/tracked_shots.png')} /> */}
          <Text style={styles.mediumText}>Tracked Shots</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("SwingRecorderHistory")}>
          {/* <Image style={styles.cardImage} source={require('../assets/recorded_swings.png')} /> */}
          <Text style={styles.mediumText}>Recorded Swings</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.buttonContainer}>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate("Scorecard")}>
          <Image style={styles.smallIcon} source={require('../assets/scorecard_icon.png')} />
          <Text style={styles.smallText}>Scorecard</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate("ShotTracker")}>
        <Image style={styles.smallIcon} source={require('../assets/shot_icon.png')} />
          <Text style={styles.smallText}>Track Shot</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate("SwingRecorder")}>
        <Image style={styles.smallIcon} source={require('../assets/swing_icon.png')} />
          <Text style={styles.smallText}>Record Swing</Text>
      </TouchableOpacity>
    </View>
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'stretch',
  },
  card: {
    backgroundColor: '#3bc45b',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#3bc45b', 
    paddingVertical: 20,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallIcon: {
    height: undefined,
    width: windowWidth * 0.1,
    aspectRatio: 1,
  },
  cardImage: {
    width: undefined,
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'center'
  },
  smallText: {
    fontSize: 18,
  },
  mediumText: {
    fontSize: 28,
  },
});