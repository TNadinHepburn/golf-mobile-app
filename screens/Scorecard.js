import { StyleSheet, Text, View, Button, ScrollView, TextInput } from 'react-native';
import { useState, useEffect  } from 'react';
import startData from '../components/Card9HoleExample.json' 
import AsyncStorage from '@react-native-async-storage/async-storage';
// import _map from 'lodash.map';
// import _reduce from 'lodash.reduce';

export default function Scorecard({ navigation }) {
  const [scoreData, updateScoreData] = useState(startData.scorecard);
  const [timestamp, setTimestamp] = useState(Date.now());
  
  const storeSorecard = async () => {
    try {
      const value = await AsyncStorage.getItem('scorecards'); 
      if (value !== null) {
        data = JSON.parse(value);
        Object.assign(data, { [timestamp]: scoreData });
      }
      else {
        data = { [timestamp]: scoreData };
      }
      await AsyncStorage.setItem('scorecards', JSON.stringify(data));
    } 
    catch (error) {
      console.log(error);
    }
  }

  const updateScore = (newScore, hole) => {
    const data = scoreData;
    const holeIndex = data.findIndex(dict => dict.hole === hole);
    data[holeIndex].score = newScore
    updateScoreData(data)
  }

  // const Row = ({data}) => {
  //   return (
  //     <ScrollView>
  //       <Text style={styles.rowItem}>{data.hole}</Text>
  //       <Text style={styles.rowItem}>{data.par}</Text>
  //         {/* keyboardType='numeric' 
  //         maxLength={1} */}        
  //       <TextInput 
  //         style={styles.rowItem} 
  //         keyboardType='numeric'
  //         maxLength={2}
  //         onChangeText={text => updateScore(text,data.hole)}
  //         placeholder={data.par}>
  //           {data.score}
  //       </TextInput>

  //     </ScrollView>
  //   )
  // }

  console.log(scoreData)
  return (
    <View style={styles.container}>
      <View style={styles.scorecardContainer}>
        {scoreData.map((data) => {
          // <Row rowdata={data}></Row>
          return(
          <View key={data.hole} style={styles.rowItem}>
            <Text>{data.hole}</Text>
            <Text >{data.par}</Text>
              {/* keyboardType='numeric' 
              maxLength={1} */}        
            <TextInput 
              keyboardType='numeric'
              maxLength={2}
              onChangeText={text => updateScore(text,data.hole)}
              >
                {data.score}
            </TextInput>
          </View>)
        })}
    </View>
      <View style={styles.buttonContainer}>
        <Button title='Save Round' onPress={storeSorecard}></Button>
        <Button title='Track Shot' onPress={() => navigation.navigate("ShotTracker")}></Button>
        <Button title='Record Swing' onPress={() => navigation.navigate("SwingRecorder")}></Button>
      </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'spcae-between',
  },
  scorecardContainer: {
    flex: 1,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#eee',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 10,
    marginHorizontal: 5,
  },
  rowItem: {
    marginBottom: 10,

  },
});