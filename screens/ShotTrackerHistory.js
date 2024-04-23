import { calculateDistance } from '../components/CalculateDistance';
import { clubFromID } from '../components/ClubFromID';
import { useState, useEffect, useRef } from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';


import demoShots from '../components/ShotsIDisTIME.json';


const timestampToDate = (time) => {
    const date = new Date(time);
    return date.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'});
  };


export default function ShotTrackerHistory({ route, navigation }) {
    const [history, setHistory] = useState({})
  
    const retrieveHistory = async () => {
      try {
        const value = await AsyncStorage.getItem('shots');
        if (value === null) {
          // TODO 1: use AsyncStorage.setItem to save demoRoutes under the key 'routes' in Async Storage and then call retrieveHistory.
          await AsyncStorage.setItem("shots", JSON.stringify(demoShots));
          retrieveHistory();
        }
        else {
          // TODO 2: use JSON.parse to convert the JSON string to an object and use set this value as history.
          setHistory(JSON.parse(value));
        }
      } 
      catch (error) {
        console.log(error); 
      }
    };

    useEffect(() => {
        let isSubscribed = true;
        if (isSubscribed) {
            AsyncStorage.clear();
            retrieveHistory();
        }
        return () => (isSubscribed = false);
      }, []);

    return (
        <Container>
          <Body>
            <HeaderText>My Shots</HeaderText>
            <View>
              <RowStyle style={{paddingLeft: 10, paddingRight: 10}}>
                <ColumnStyle key="th1">
                  <ColumnText>Date</ColumnText>
                </ColumnStyle>
                <ColumnStyle key="th2">
                  <ColumnText>Club</ColumnText>
                </ColumnStyle>
                <ColumnStyle key="th3">
                  <ColumnText>Distance</ColumnText>
                </ColumnStyle>
              </RowStyle>
              <DivideHeader />
              {Object.keys(history).map((item) => (
                  <RowStyle key={item}>
                    <ColumnStyle key="col1">
                      <ColumnText>{timestampToDate(parseInt(item))}</ColumnText>
                    </ColumnStyle>
                    <ColumnStyle key="col2">
                      <ColumnText>{clubFromID(history[item].club)}</ColumnText>
                    </ColumnStyle>
                    <ColumnStyle key="col3">
                      <ColumnText>{calculateDistance(history[item])}</ColumnText> 
                    </ColumnStyle>
                  </RowStyle>
                ))}
            </View>
          </Body>
        </Container>
      );

}


const Container = styled.View`
  flex: 1;
  background: #000;
`;


const Body = styled.ScrollView`
  background: #000;
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

const TouchButton = styled.TouchableOpacity`
  margin-left: 10px;
  margin-right: 10px;
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
