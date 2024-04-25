import { useState, useEffect, useRef } from 'react';
import { StyleSheet ,Text, View, Button, Image} from 'react-native';
import { Camera, CameraType } from "expo-camera";
import { Video } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { useIsFocused } from '@react-navigation/native'; 
// import VideoPlayer from 'react-native-native-video-player';


const VID_DIR = FileSystem.documentDirectory + "GA_VID";

export default function SwingRecorder() {
  const cameraRef = useRef({});
  const isFocused = useIsFocused();  
  const [statusCamera, requestCameraPermission] = Camera.useCameraPermissions();
  const [statusAudio, requestAudioPermission] = Camera.useMicrophonePermissions();
  const [recording , setRecording] = useState(false);
  const [guide , setGuide] = useState(true);

  const enableGuide = () => {
    setGuide(true)

  };
  const disableGuide =  () => {
    setGuide(false)

  };
  const flipGuide = async () => {

  };

  const requestCameraPermissions = async () => {
    if (statusCamera == null) {
      await setHasCameraPermission();
    }
    else if (statusCamera.granted == false) {
      alert('Camera permissions denied');
    }
  }

  const requestAudioPermissions = async () => {
    if (statusAudio == null) {
      await setHasCameraPermission();
    }
    else if (statusAudio.granted == false) {
      alert('Audio permissions denied');
    }
  }

  const ensureDirExists = async () => {
    const dirInfo = await FileSystem.getInfoAsync(VID_DIR);
 
    if (!dirInfo.exists) {
      console.log("Video directory doesn't exist, creating...");
      await FileSystem.makeDirectoryAsync(VID_DIR);
    }
  };

  const startVideo = async () => {
    try{
      saveURI = `${VID_DIR}/golf_${Date.now()}.mp4`
      setRecording(true)
      videoObj = await cameraRef.current.recordAsync();
      result = await FileSystem.moveAsync({from: videoObj.uri, to: saveURI});
    }
    catch (e) {
      console.log(e)
      setRecording(false)
    }
  };

  const endVideo = async () => {
    try{
      // saveURI = `${VID_DIR}/golf_${Date.now()}.mp4`
      videoObj = await cameraRef.current.stopRecording();
      setRecording(false)
      // result = await FileSystem.moveAsync({from: videoObj.uri, to: saveURI});
    }
    catch (e) {
      console.log(e)
    }
  };

  useEffect(() => {
    requestCameraPermission();
    requestAudioPermission();
    ensureDirExists();
  })
  
 
  if (isFocused) {
    return (
    <View style={{flex : 1}}>
      <Camera ratio="16:9" style={styles.camera} ref={cameraRef}/>
      {/* {guide ?
        flipGuide ?
        <Image source={require('../assets/splash.png')}></Image>
        :
        <Image source={require('../assets/icon.png')}></Image>
      :
      <View />
      } */}
      {recording ?
        <View style={styles.buttonContainer}>
        <Button title='EndVideo' onPress={endVideo} style={styles.button}>End</Button>
        </View>
        :
        <View style={styles.buttonContainer}>
        <Button title='StartVideo' onPress={startVideo} style={styles.button}>Start</Button>
        </View>

      }
      {/* {guide ?
      <View>
        <Button title='flip guide' onPress={flipGuide}></Button>
        <Button title='disable guide' onPress={disableGuide}></Button>
      </View>
      :
      <Button title='enable guide' onPress={enableGuide}></Button>
      } */}
    </View>
    );  
  }
  else {
    return <View/>
  }
 
 


  // const [hasAudioPermission, setHasAudioPermission] = useState(null);
  // const [hasCameraPermission, setHasCameraPermission] =useState(null);
  // //const [camera, setCamera] = useState(null);
  // // const [type, setType] = useState(Camera.Constants.Type.back);
  // const [isRecording, setIsRecording] = useState(false);
  // const [recordedVideoURI, setRecordedVideoURI] = useState(null);

  // const onRecordingStart = () => {
  //   setIsRecording(true);
  // };

  // const onRecordingEnd = () => {
  //   setIsRecording(false);
  // };

  // const toggleRecording = async () => {
  //   if (isRecording) {
  //     try {
  //       await cameraRef.current.stopRecording();

  //     } catch (error) {
  //       console.error('Failed to stop recording', error);
  //     }
  //   } else {
  //     try {
  //       const data = await cameraRef.current.recordAsync()
  //         .then(onRecordingStart)
  //         .catch(error => console.error('Failed to start recording', error));
  //       setRecordedVideoURI(data.uri)
  //     } catch (error) {
  //       console.error('Failed to start recording', error);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   (async () => {
  //     const cameraStatus = await Camera.requestCameraPermissionsAsync();
  //     setHasCameraPermission(cameraStatus.status === 'granted');
  //     const audioStatus = await Camera.requestMicrophonePermissionsAsync();
  //     setHasAudioPermission(audioStatus.status === 'granted');})();
  // }, []);

  // if (hasCameraPermission === null || hasAudioPermission === null ) {
  //   return <View />;
  // }
  // if (hasCameraPermission === false || hasAudioPermission === false) {
  //     return <Text>No access to camera</Text>;
  //   }
  // if (isFocused) {
  //   return (
  //   <View style={{flex : 1}}>
  //     <Camera 
  //       ratio="16:9" 
  //       style={{flex : 1}} 
  //       ref={cameraRef} 
  //       type={Camera.Constants.Type.back}
  //     />

  //     {/* <Button
  //       title="Flip"
  //       onPress={() => {
  //       setType(
  //         type === Camera.Constants.Type.back
  //         ? Camera.Constants.Type.front
  //         : Camera.Constants.Type.back
  //         );
  //         }}>
  //     </Button> */}

  //     <Button
  //       title={isRecording ? 'Stop Video' : 'Take Video'}
  //       onPress={toggleRecording}
  //     />
  //   </View>
  //   );  
  // }
  // else {
    // return <View/>
  // }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // buttonContainer: {
  //   flex: 2,
  //   flexDirection: 'row',
  // },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
});