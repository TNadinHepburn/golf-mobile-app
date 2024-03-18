import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect  } from 'react';

export default function SwingRecorder() {

return (
  <View style={styles.container}>
    <View style={styles.container}>
        <Text>Swing Recorder</Text>
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
    flex: 2,
    flexDirection: 'row',
  },
});