import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import styled from 'styled-components';


export default function ScorecardView({ route, navigation }) {
    const {scorecard, timestamp} = route.params;
    console.log(timestamp);
    return(
        <Container>
        <Body>
            <HeaderText>Round: {timestamp}</HeaderText>
          <View>
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
            {scorecard.map((item) => (
                <RowStyle key={item.hole}>
                  <ColumnStyle key="col1">
                    <ColumnText>{item.hole}</ColumnText>
                  </ColumnStyle>
                  <ColumnStyle key="col2">
                    <ColumnText>{item.par}</ColumnText>
                  </ColumnStyle>
                  <ColumnStyle key="col3">
                    <ColumnText>{item.score}</ColumnText> 
                  </ColumnStyle>
                </RowStyle>
              ))}
              <DivideBody />
              <RowStyle key='Totals'>
                  <ColumnText>Totals</ColumnText>
                  <ColumnText></ColumnText>
              </RowStyle>
              <ColumnStyle></ColumnStyle>
          </View>
        </Body>
      </Container>
    )
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

  const Container = styled.View`
  flex: 1;
  background: #000;
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
