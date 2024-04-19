import { useState, useEffect, useRef } from 'react';
import { StyleSheet ,Text, View, Button,} from 'react-native';
import { Camera } from 'expo-camera';
import { Video } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { useIsFocused } from '@react-navigation/native'; 
import VideoPlayer from 'react-native-native-video-player';

const RECS_DIR = FileSystem.documentDirectory + "GA_RECS";

export default function SwingRecorder() {
  const cameraRef = useRef(null);
  const isFocused = useIsFocused();
  const [hasAudioPermission, setHasAudioPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] =useState(null);
  //const [camera, setCamera] = useState(null);
  // const [type, setType] = useState(Camera.Constants.Type.back);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideoURI, setRecordedVideoURI] = useState(null);

  const onRecordingStart = () => {
    setIsRecording(true);
  };

  const onRecordingEnd = () => {
    setIsRecording(false);
  };

  const toggleRecording = async () => {
    if (isRecording) {
      try {
        await cameraRef.current.stopRecording();

      } catch (error) {
        console.error('Failed to stop recording', error);
      }
    } else {
      try {
        const data = await cameraRef.current.recordAsync()
          .then(onRecordingStart)
          .catch(error => console.error('Failed to start recording', error));
        setRecordedVideoURI(data.uri)
      } catch (error) {
        console.error('Failed to start recording', error);
      }
    }
  };

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
      <Camera 
        ratio="16:9" 
        style={{flex : 1}} 
        ref={cameraRef} 
        type={Camera.Constants.Type.back}
      />

      {/* <Button
        title="Flip"
        onPress={() => {
        setType(
          type === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
          );
          }}>
      </Button> */}

      <Button
        title={isRecording ? 'Stop Video' : 'Take Video'}
        onPress={toggleRecording}
      />
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