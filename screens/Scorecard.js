import { StyleSheet, Text, View, Button, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useState, useEffect  } from 'react';
import startData from '../components/Card9HoleExample.json' 
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components';

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

  return (
    <Container>
      <Body>
        <HeaderText>My Shots</HeaderText>
          <RowStyle style={{paddingLeft: 10, paddingRight: 10}}>
            <ColumnStyle key="th1">
              <ColumnText>Hole</ColumnText>
            </ColumnStyle>
            <ColumnStyle key="th2">
              <ColumnText>Par</ColumnText>
            </ColumnStyle>
            <ColumnStyle key="th3">
              <ColumnText>Score</ColumnText>
            </ColumnStyle>
          </RowStyle>
          <DivideHeader />
            {scoreData.map((data) => {
              // <Row rowdata={data}></Row>
              return(
              <View key={data.hole} style={styles.rowItem}>
                <RowStyle>
                <ColumnStyle key="col1">
                  <ColumnText>{data.hole}</ColumnText>
                </ColumnStyle>
                <ColumnStyle key="col2">
                  <ColumnText>{data.par}</ColumnText>
                </ColumnStyle>   
                <ColumnStyle key="col3">
                  <ColumnTextInput
                    keyboardType='numeric'
                    maxLength={2}
                    onChangeText={text => updateScore(text,data.hole)}
                    placeholder={'0'}>
                    {data.score}
                    </ColumnTextInput> 
                </ColumnStyle>
                </RowStyle>
              </View>)
            })}
        <View style={styles.navButtons}>
          <TouchButton onPress={storeSorecard}><BtnText>Save Round</BtnText></TouchButton>
          <TouchButton onPress={() => navigation.navigate("ShotTracker")}><BtnText>Track Shot</BtnText></TouchButton>
          <TouchButton onPress={() => navigation.navigate("SwingRecorder")}><BtnText>Record Swing</BtnText></TouchButton>
        </View>
      </Body>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
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
  navButtons: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  }
});



const Container = styled.View`
  flex: 1;
  background: #fff;
`;

const Body = styled.ScrollView`
  background: green;
  height: 100%;
  width: 100%;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  position: absolute;
  top: 0%;
`;

const BodyText = styled.Text`
  color: white;
  font-size: 15px;
  margin: 20px 20px;
`;

const RowStyle = styled.View`
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-left: 20px;
  margin-right: 20px;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-evenly;
`;
const ColumnStyle = styled.View`
  flex: 1;
  height: 30px;
`;

const ColumnText = styled.Text`
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  width: 100%;
`;
const ColumnTextInput = styled.TextInput`
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  width: 100%;
  borderColor: #000;
`;

const Divide = styled.View`
  background: #fff;
  height: 1px;
  align-items: center;
  margin-left: 10px;
  margin-right: 10px;
`;

const DivideHeader = styled.View`
  background: #fff;
  height: 1px;
  align-items: center;
  margin-left: 20px;
  margin-right: 20px;
`;
const DivideBody = styled.View`
  background: #fff;
  height: 1px;
  align-items: center;
  margin-left: 20px;
  margin-right: 20px;
`;

const TouchButton = styled.TouchableOpacity`
  padding-left: 10px;
  padding-right: 10px;
  background: black;
`;

const Btn = styled.Button`
  height: 50px;
  width: 150px;
  border-radius: 15px;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: absolute;
  left: 150px;
  top: 150px;
  z-index: 9999;
  background: #333;
`;

const HeaderText = styled.Text`
  color: white;
  font-size: 25px;
  margin-top: 5%;
  margin-left: 20px;
  font-weight: bold;
  text-align: center;
`;
const Submit = styled.View`
  flex: 1;
  height: 50px;
  border-radius: 15px;
  margin-right: 20px;
  margin-left: 20px;
  margin-bottom: 20px;
  padding: 10px;
  background: red;
  height: 50px;
`;
const BtnText = styled.Text`
  color: white;
  font-size: 15px;
  text-align: center;
  line-height: 30px;
`;
