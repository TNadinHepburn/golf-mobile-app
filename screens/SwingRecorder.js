import { useState, useEffect, useRef } from 'react';
import { StyleSheet ,Text, View, Button, Image, SafeAreaView} from 'react-native';
import { Camera, CameraType } from "expo-camera";
import { Video } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { useIsFocused } from '@react-navigation/native'; 
import { saveToLibraryAsync } from 'expo-media-library';
// import VideoPlayer from 'react-native-native-video-player';


const VID_DIR = FileSystem.documentDirectory + "GA_VID";

export default function SwingRecorder() {
  const cameraRef = useRef({});
  const isFocused = useIsFocused();  
  const [statusCamera, requestCameraPermission] = Camera.useCameraPermissions();
  const [statusAudio, requestAudioPermission] = Camera.useMicrophonePermissions();
  const [videoURI, setVideoURI] = useState(null);
  const [recording , setRecording] = useState(false);
  const [guide , setGuide] = useState(true);
  const [handed, setHanded] = useState(true);

  const enableGuide = () => {
    setGuide(true)

  };
  const disableGuide =  () => {
    setGuide(false)

  };
  const flipGuide = async () => {
    handed ? setHanded(false) : setHanded(true);
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

  const startVideo = () => {
    try{
      setRecording(true)
      cameraRef.current.recordAsync().then((recordedVideo) => {
        setVideoURI(recordedVideo);
        setRecording(false);
      });
    }
    catch (e) {
      console.log(e)
      setRecording(false)
    }
  };

  const endVideo = async () => {
    try{
      setRecording(false)
      cameraRef.current.stopRecording();
    }
    catch (e) {
      console.log(e)
      setRecording(false)
    }
  };

  const saveVideo = async () => {
    saveURI = `${VID_DIR}/swing_${Date.now()}.mp4`
    result = await FileSystem.moveAsync({from: videoURI.uri, to: saveURI});
    setVideoURI(undefined);
  }

  useEffect(() => {
    requestCameraPermission();
    requestAudioPermission();
    // requestLibraryPermission();
    ensureDirExists();
  })
 

 
  if (isFocused) {  
    
    if(videoURI){
    return(
      <SafeAreaView style={styles.camera}>
        <Video style={styles.video} source={{uri: videoURI.uri}} resizeMode='contain' isLooping useNativeControls>
          <Button title="Save" onPress={saveVideo}></Button>
        </Video>
      </SafeAreaView>
    )
  }
  else {
    return (
      <Camera ratio="16:9"  ref={cameraRef} style={styles.camera}>
        <View style={styles.buttonContainer}>
      {/* {guide ?
        flipGuide ?
        <Image source={require('../assets/splash.png')}></Image>
        :
        <Image source={require('../assets/icon.png')}></Image>
        :
        <View />
      } */}
        <Button title={recording ? 'EndVideo' : 'StartVideo'} onPress={recording ? endVideo : startVideo}></Button>
      {/* {guide ?
      <View>
      <Button title='flip guide' onPress={flipGuide}></Button>
      <Button title='disable guide' onPress={disableGuide}></Button>
      </View>
      :
      <Button title='enable guide' onPress={enableGuide}></Button>
    } */}
    </View>
    </Camera>
    );  
  }
  }
  else {
    if (recording){
      cameraRef.current.stopRecording();
      setRecording(false);
    }
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
    alignItems: 'centre',
    justifyContent: 'center',
  },
  buttonContainer: {
    alignSelf: 'flex-end',
  },
  video: {
    flex: 1,
    alignSelf: 'strech',
  },
});