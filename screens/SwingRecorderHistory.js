import { StyleSheet ,Text, View, Button, ScrollView} from 'react-native';
import { Video } from 'expo-av';
import * as FileSystem from "expo-file-system";
import { useState, useEffect } from 'react';

const VID_DIR = FileSystem.documentDirectory + "GA_VID";

export default function SwingRecorderHistory() {
    const [allVideos, setAllVideos] = useState([])

    const Row = ({ dir, videos }) => {
        return(
          <View style={styles.row}>
          {videos.map((video) => (
              <View style={styles.videoContainer} key={video}>
                <Video source={{'uri': `${dir}/${video}`}} style={styles.video} />
              </View>
            ))}
          </View>
        );
      } 

    const retrieveVideos = async () => { 
        try {
          const currVideos = await FileSystem.readDirectoryAsync(VID_DIR); 
          setAllVideos(currVideos)
        } catch (error) {
          console.log('Error retrieving videos');
        }
      };

      useEffect(() => {
        retrieveVideos();
      })

      const gallery = [];
      const rowWidth = 5;
      for (let i = 0; i < (allVideos.length / rowWidth) + 1; i++) {
        gallery.push(<Row rowVideos={allVideos.slice(i*rowWidth, i*rowWidth+rowWidth)} key={i}></Row>)
      }
      if (allVideos){
        return (    
            <View style={styles.container}>
                <ScrollView contentContainerStyle={{flexGrow: 1}}>
                    <Text>{allVideos}</Text>
                </ScrollView>
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