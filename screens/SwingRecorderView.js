import {Video} from 'expo-av';
import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useRef, useState } from 'react';

export default function SwingRecorderView({route}) {
    const { videouri } = route.params;
    const video = useRef(null);
    const [status, setStatus] = useState({});

    console.log('videouri',videouri);
    return (
        <View style={styles.container}>
            <Video 
                ref={video}
                style={styles.video}
                source={{ uri: videouri }}
                isLooping
                useNativeControls
                
            />
        </View>
    );
}


const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
},
video: {
    flex:1,
    alignSelf: 'stretch',
    resizeMode: 'contain'
  },
})