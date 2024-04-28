import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { useState, useEffect  } from 'react';
import { clubFromID, clubList } from '../components/ClubFromID';
import { calculateDistance } from '../components/CalculateDistance';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import mapStyle from '../components/MapStyle'
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';
import colours from '../components/Colours';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import {Picker} from '@react-native-picker/picker';

const DEFAULT_PADDING = {top: 40, right: 40, bottom: 40, left: 40}

export default function ShotTracker({ navigation }) {
  const [timestamp, setTimestamp] = useState(0)
  const [watchID, setWatchID] = useState(false);
  const [clubUsed, setClubUsed] = useState('9I');
  const [trackingData, setTrackingData] = useState({end:{latitude: 53.3153612, longitude: -0.4857597},start:{latitude: 53.3153612, longitude: -0.4857597},timestamp:0,club:"8I"});

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }
    })();
  }, []);

  const geolocationPositionOpts = {useSignificantChanges: true};

  const getStartCoordinates = (position) => {
    const g = {latitude:position.coords.latitude,
      longitude:position.coords.longitude};
    trackingData.start = g;
    console.log('start tracking data: ', trackingData)
    setTrackingData(trackingData);
  };

  const startTracking = () => {
    setTimestamp(Date.now())
    trackingData.timestamp = timestamp
    //TODO 2: Get watch id from navigator.geolocation.watchPosition and set this using setWatchID
    navigator.geolocation.getCurrentPosition(getStartCoordinates, onGeolocationError, {});
    setWatchID(navigator.geolocation.watchPosition(onGeolocation, onGeolocationError, {}));
    
  };

  const stopTracking = () => {
    
    navigator.geolocation.clearWatch(watchID);
    // Store the new route
    trackingData.club = clubUsed
    setTrackingData(trackingData)
    // navigator.geolocation.getCurrentPosition(getEndCoordinates, onGeolocationError, {});
    
    storeShot();

    //Reset state
    setWatchID(false);
    setTimestamp(0);
    setTrackingData([]);

  };

  const storeShot = async () => {
    try {
      const value = await AsyncStorage.getItem('shots'); 
      if (value !== null) {
        data = JSON.parse(value);
        Object.assign(data, { [timestamp]: trackingData });
      }
      else {
        data = { [timestamp]: trackingData };
      }
      await AsyncStorage.setItem('shots', JSON.stringify(data));
    } 
    catch (error) {
      console.log(error);
    }
  }

  // TODO 3: Implement onGeolocation function
  const onGeolocation = (position) => { 
    const g = {longitude: position.coords.longitude,
               latitude: position.coords.latitude};

    trackingData.end = g;
    console.log('geoupdaet: ', trackingData)
    setTrackingData(trackingData);  
  };

  const onGeolocationError = (positionError) => {
    alert('Geolocation error', JSON.stringify(positionError)); 
  };
  
const fitAllMarkers = (coords) => {
  googlemap.fitToCoordinates(coords), {
    edgePadding: DEFAULT_PADDING,
    animated: true
  }
}

return (
  <View style={styles.container}>
    <Picker selectedValue={clubUsed} 
      style={styles.picker}
      onValueChange={(itemValue, itemIndex) =>
      setClubUsed(itemValue)
      }>
        {Object.keys(clubList).map((key) => {
          return (
            <Picker.Item label={clubList[key]} value={key} key={key}></Picker.Item>
          )
        })}

    </Picker>
    {/* customMapStyle={mapStyle} */}
    <MapView
        // style={{mapStyle}.map}
        flex={1}
        mapType='satellite'
        initialRegion={{
          latitude: 53.3153612,
          longitude: -0.4857597,
          latitudeDelta: 0.01,
          longitudeDelta: 0.015,
        }}
        showsUserLocation={true}
        provider={PROVIDER_GOOGLE}
        ref={(ref) => {googlemap = ref;}}
        >
      </MapView>

    {/* {watchID ?
      <Submit>
        <TouchButton onPress={stopTracking}>
          <BtnText>STOP</BtnText>
        </TouchButton>
      </Submit>
    : <RowStyle>
      <View style={{ paddingLeft: "5%" }}> 
        <ItemsLayout>
          <Holder>
                <Submit>
              <TouchButton title="Track" onPress={startTracking}>
                <BtnText>Track</BtnText>
              </TouchButton>
                </Submit>
          </Holder>
        </ItemsLayout>
      </View>
    </RowStyle> } */}

      {watchID ?
        <View style={styles.bottomContainer}>
          <TouchableOpacity onPress={stopTracking} style={styles.buttonShared}>
            <Text style={styles.buttonText}>End Shot</Text>
          </TouchableOpacity>
          <View style={styles.distanceContainer}>
            <Text style={styles.distanceText}>{calculateDistance(trackingData)} Yards</Text>
          </View>
        </View>
      :
          <TouchableOpacity onPress={startTracking} style={styles.button}>
            <Text style={styles.buttonText}>Track Shot</Text>
          </TouchableOpacity>
      }

</View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  picker: {
    backgroundColor: 'green',
    color: 'white',
  },
  buttonText: {
    color: 'white',
    fontSize: 25,
    lineHeight: 30,
  },
  button: {
    height: 50,
    width: '100%',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: 'green',
    marginRight: 2,
  },
  buttonShared: {
    height: 50,
    width: '75%',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: 'green',
    marginRight: 2,
  },
  bottomContainer: {
    flexDirection: 'row',
  },
  distanceContainer: {
    height: 50,
    width: '25%',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: 'green',
    marginleft: 2,
  },
  distanceText: {
    fontSize: 25,
    justifyContent:'center',
    alignItems:'center',
    color: 'white',
  },

});

const Container = styled.View`
  flex: 1;
  background: white;
`;
const Holder = styled.View`
  padding-top: 100px;
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-evenly;
  width: 100%;
`;

const HeaderImage = styled.Image`
  width: 100%;
  height: 40%;
  background: ${colours.blue};
`;

const Body = styled.ScrollView`
  background: gray;
  height: 80%;
  width: 100%;
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  position: absolute;
  top: 25%;
  padding: 10px;
`;
const ItemsLayout = styled.View`
  flex: 1;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-evenly;
  width: 100%;
`;

const TouchButton = styled.TouchableOpacity``;

const Submit = styled.View`
  flex: 1;
  height: 50px;
  width: 100%;
  border-radius: 15px;
  padding: 10px;
  background: ${colours.green};
`;

const HeaderText = styled.Text`
  color: white;
  font-size: 25px;
  margin-top: 5%;
  margin-left: 20px;
  font-weight: bold;
`;

const BodyText = styled.Text`
  color: white;
  font-size: 15px;
  margin: 20px 20px;
`;
const BtnText = styled.Text`
  color: white;
  font-size: 25px;
  text-align: center;
  line-height: 30px;
`;
const RowStyle = styled.View`
  flex-direction: row;
  width: 100%;
`;

const Divide = styled.View`
  background: ${colours.blue};
  height: 1px;
  margin: 10px 20px;
  align-items: center;
`;

const Subtitle = styled.Text`
  font-size: 20px;
  color: ${colours.blue};
  font-weight: 500;
  text-transform: uppercase;
  padding-left: 15px;
  padding-top: 15px;
`;
