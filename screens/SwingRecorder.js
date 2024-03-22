import { useState, useEffect, useRef } from 'react';
import { StyleSheet ,Text, View, Button,} from 'react-native';
import { Camera } from 'expo-camera';
import { Video } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { useIsFocused } from '@react-navigation/native'; 

export default function SwingRecorder() {
  const cameraRef = useRef({});
  const isFocused = useIsFocused();
  const [hasAudioPermission, setHasAudioPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] =useState(null);
  const [camera, setCamera] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const takeVideo = async () => {
    if(camera){
        const data = await camera.recordAsync()
        setRecord(data.uri);
        console.log(data.uri);
    }
  }
  const stopVideo = async () => {
    camera.stopRecording();
  }

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
      const audioStatus = await Camera.requestMicrophonePermissionsAsync();
      setHasAudioPermission(audioStatus.status === 'granted');})();
  }, []);

  if (hasCameraPermission === null || hasAudioPermission === null ) {
    return <View />;
  }
  if (hasCameraPermission === false || hasAudioPermission === false) {
      return <Text>No access to camera</Text>;
    }
  if (isFocused) {
    return (
    <View style={{flex : 1}}>
       <Camera ratio="16:9" style={{flex : 1}} ref={cameraRef}/>
       <Button
        title="Flip"
        onPress={() => {
        setType(
          type === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
          );
          }}>
      </Button>
      <Button title="Take video" onPress={() => takeVideo()} />
      <Button title="Stop Video" onPress={() => stopVideo()} />
    </View>
    );  
  }
  else {
    return <View/>
  }
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