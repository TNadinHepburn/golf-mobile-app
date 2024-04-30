// import { StyleSheet ,Text, View, Button, Image, SafeAreaView} from 'react-native';
// import { Camera, CameraType } from "expo-camera";
// import { Video } from 'expo-av';
// import * as FileSystem from 'expo-file-system';
// import { useIsFocused } from '@react-navigation/native'; 
// import { saveToLibraryAsync } from 'expo-media-library';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// // import VideoPlayer from 'react-native-native-video-player';

import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet ,Text, View, Button, Image, Dimensions} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Camera } from 'expo-camera';
import { Video } from 'expo-av';
import * as FileSystem from 'expo-file-system';
const windowWidth = Dimensions.get("window").width;

const VID_DIR = FileSystem.documentDirectory + "Fairway_Finder";

export default function SwingRecorder() {
  const [hasAudioPermission, setHasAudioPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [record, setRecord] = useState(null);
  const [recording, setRecording] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const video = useRef(null);
  const [guide , setGuide] = useState(true);
  const [guideStyle , setGuideStyle] = useState(true);
  const [handed, setHanded] = useState(true);
  
  
  

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');

      const audioStatus = await Camera.requestMicrophonePermissionsAsync();
      setHasAudioPermission(audioStatus.status === 'granted');

      await ensureDirExists();

    })();
  }, []);

  const takeVideo = async () => {
    if(camera){
        setRecording(true);
        const data = await camera.recordAsync({
          maxDuration:10
        })
        setRecord(data.uri);
        setRecording(false);
        console.log(data.uri);
    }
  }

  const stopVideo = async () => {
    camera.stopRecording();
  }

  const saveVideo = async () => {
    saveURI = `${VID_DIR}/swing_${Date.now()}.mp4`
    result = await FileSystem.moveAsync({from: record, to: saveURI});
    setRecord(undefined);
  }

  const enableGuide = () => {
    setGuide(true)

  };
  const disableGuide =  () => {
    setGuide(false)

  };

  const changeGuide =  () => {
    guideStyle ? setGuideStyle(false) : setGuideStyle(true) 

  };
  
  const flipGuide = async () => {
    handed ? setHanded(false) : setHanded(true);
  };

  const ensureDirExists = async () => {
    const dirInfo = await FileSystem.getInfoAsync(VID_DIR);
 
    if (!dirInfo.exists) {
      console.log("Video directory doesn't exist, creating...");
      await FileSystem.makeDirectoryAsync(VID_DIR);
    }
  };


  if (hasCameraPermission === null || hasAudioPermission === null ) {
    return <View />;
  }
  if (hasCameraPermission === false || hasAudioPermission === false) {
    return <Text>No access to camera</Text>;
  }

  if (record){
    return (
      <View>
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: record,
          }}
          useNativeControls
          resizeMode="contain"
          isLooping
          // onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
        <View style={styles.buttons}>
          <Button
            title='Save'
            onPress={saveVideo}
          />
        </View>
          
        </View>
    )
  }

  return (
    <View style={styles.container}>
      <Camera 
      ref={ref => setCamera(ref)}
      style={styles.camera} 
      type={type}
      ratio='16:9'>
        {guide ?
          handed ?
          <View style={styles.overlayContainer}>
            {guideStyle ? 
              <Image style={styles.overlay} source={require('../assets/guide_dtl_rh.png')}></Image>
              :
              <Image style={styles.overlay} source={require('../assets/guide_side_rh.png')}></Image>
            }
          </View>
          :
          <View style={styles.overlayContainer}>
            {guideStyle ? 
              <Image style={styles.overlay} source={require('../assets/guide_dtl_lh.png')}></Image>
              :
              <Image style={styles.overlay} source={require('../assets/guide_side_lh.png')}></Image>
            }
          </View>  
          :
          <View/>      
        }
        <View style={styles.recordingButtonContainer}>
        <TouchableOpacity onPress={recording ? stopVideo : takeVideo} style={styles.recordingButton}>
          <Text style={styles.text}>{recording ? 'Stop Video' : 'Take Video'}</Text>
        </TouchableOpacity>
        </View>

        {guide ?
          <View style={styles.optionButtonsContainer}>
            <TouchableOpacity style={styles.optionButton} onPress={changeGuide}><Text style={styles.text}>View: {guideStyle ? 'DTL' : 'Side'}</Text></TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={disableGuide}><Text style={styles.text}>Disable Guide</Text></TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={flipGuide}><Text style={styles.text}>{handed ? 'Right Handed' : 'Left Handed'}</Text></TouchableOpacity>
          </View>
          :
          <TouchableOpacity style={styles.button} onPress={enableGuide}><Text style={styles.text}>Enable Guide</Text></TouchableOpacity>
        }
      </Camera>

    </View>
  );
}


{/* <View style={styles.buttonContainer}>
<TouchableOpacity onPress={recording ? endVideo : startVideo} style={styles.recoringButton}>
  <Text>{recording ? 'End Video' : 'Start Video'}</Text>
</TouchableOpacity>
{guide ?
<View>
<Button title='flip guide' onPress={flipGuide}></Button>
<Button title='disable guide' onPress={disableGuide}></Button>
</View>
:
<Button title='enable guide' onPress={enableGuide}></Button>
}
</View> */}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // backgroundColor: '#ecf0f1',
  },
  camera: {
    flex:1,
    justifyContent: 'flex-end', // Align camera to bottom
    alignItems: 'center', // Center camera horizontally
    alignSelf: 'stretch',
    resizeMode: 'contain'
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  video: {
      flex:1,
      alignSelf: 'stretch',
      resizeMode: 'contain'
  },
  button: {
    height: 50,
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    marginHorizontal: 20,
  },
  recordingButtonContainer: {
    marginBottom: 20, 
  },
  recordingButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dd0000',
    width: 75,
    height: 75,
    borderRadius:45,
  },
  overlayContainer: {
    position: 'absolute',
    top: '30%', 
    left: '15%', 
    width: '70%', 
    aspectRatio: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  overlay: {
    width: '100%',
    height: '100%',
    resizeMode:'contain'
  },
  optionButtonsContainer:{
    height: 50,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-evenly',
  },
  optionButton: {
    flex: 1, 
    marginHorizontal: 5, 
    width: windowWidth * 0.33,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  text: {
    color: 'white',
    fontSize: 18,
    lineHeight: 30,
    textAlign: 'center',
  },
});