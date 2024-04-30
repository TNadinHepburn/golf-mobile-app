import { StyleSheet ,Text, View, Button, ScrollView, Image, TouchableOpacity} from 'react-native';
import { Video } from 'expo-av';
import * as FileSystem from "expo-file-system";
import { useState, useEffect } from 'react';
// import { TouchableOpacity } from 'react-native-gesture-handler';

const VID_DIR = FileSystem.documentDirectory + "Fairway_Finder";

export default function SwingRecorderHistory({ navigation }) {
    const [allVideos, setAllVideos] = useState([])

    const Row = ({ dir, videos }) => {
        return(
          <View style={styles.row}>
          {videos.map((video) => (
            <TouchableOpacity 
              onPress={() => navigation.navigate("SwingRecorderView", { videouri: `${dir}/${video}` })}
              style={styles.videoContainer}
              key={video}
            >
              <Image source={{ uri: `${dir}/${video}` }} style={styles.video} />
            </TouchableOpacity>
            // <View onPress={() => navigation.navigate("SwingRecorderView", {videouri: `${dir}/${video}`})} style={styles.videoContainer} key={video}>

            //     <Image source={{'uri': `${dir}/${video}`}} style={styles.video} />

            //   </View>
            ))}
          </View>
        );
      };

    const ensureDirExists = async () => {
      const dirInfo = await FileSystem.getInfoAsync(VID_DIR);
    
      if (!dirInfo.exists) {
        console.log("Video directory doesn't exist, creating...");
        await FileSystem.makeDirectoryAsync(VID_DIR);
      }
    };

    const retrieveVideos = async () => { 
        try {
          ensureDirExists();
          const currVideos = await FileSystem.readDirectoryAsync(VID_DIR); 
          setAllVideos(currVideos)
        } catch (error) {
          console.log('Error retrieving videos');
        }
      };

      useEffect(() => {
        retrieveVideos();
      }, [])

      const gallery = [];
      const rowWidth = 3;
      if (allVideos){
        for (let i = 0; i < (allVideos.length / rowWidth) + 1; i++) {
          gallery.push(<Row videos={allVideos.slice(i*rowWidth, i*rowWidth+rowWidth)} key={i} dir={VID_DIR}></Row>)
        }
        return (    
            <View style={styles.container}>
                    {gallery}
        </View>
            );
            }
      else{
          return (
              <View/>
          )
      }
}


const styles = StyleSheet.create({
    container: {
      height: '100%'
    },
    row: {
      flexDirection: 'row', 
      flex: 1
    },
    videoContainer: {
      width: '33%'
    },
    video: {
      height: 170
    }
});