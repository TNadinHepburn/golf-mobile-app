import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { useState, useEffect  } from 'react';
import { clubFromID } from '../components/ClubFromID';
import { calculateDistance } from '../components/CalculateDistance';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';
import colours from '../components/Colours';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

export default function ShotTracker({ navigation }) {
  const [timestamp, setTimestamp] = useState(0)
  const [trackingData, setTrackingData] = useState({end:{},start:{},timestamp:0,club:"8I"});
  const [watchID, setWatchID] = useState(false);
  const [clubUsed, setClubUsed] = useState('9I');
  const [distance, setDistance] = useState(null);

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
  const getEndCoordinates = (position) => {
    const g = {latitude: position.coords.latitude,
      longitude: position.coords.longitude};
    trackingData.end = g;
    console.log('end tracking data: ', trackingData)
    setTrackingData(trackingData);
  };



  const startTracking = () => {
    setTimestamp(Date.now())
    trackingData.timestamp = timestamp
    trackingData.club = clubUsed;
    setTrackingData(trackingData)
    //TODO 2: Get watch id from navigator.geolocation.watchPosition and set this using setWatchID
    navigator.geolocation.getCurrentPosition(getStartCoordinates, onGeolocationError, {});
    setWatchID(navigator.geolocation.watchPosition(onGeolocation, onGeolocationError, {}));
  };

  const stopTracking = () => {
    
    navigator.geolocation.clearWatch(watchID);
    // Store the new route

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
        await AsyncStorage.setItem('shots', JSON.stringify(data));
      }
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
    {watchID ?
      <Submit>
        {/* TODO 8: Call stopTracking when pressed */}
        <TouchButton onPress={stopTracking}>
          <BtnText>STOP</BtnText>
        </TouchButton>
      </Submit>
    : <RowStyle>
      <View style={{ paddingLeft: "5%" }}> 
        <ItemsLayout>
          <Holder>
                <Submit>
              {/* TODO 4: Call startTracking when pressed */}
              <TouchButton title="Track" onPress={startTracking}>
                <BtnText>Track</BtnText>
              </TouchButton>
                </Submit>
          </Holder>
        </ItemsLayout>
      </View>
    </RowStyle> }
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
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 80,
    width: '100%',
  },
  distanceContainer: {
    position: 'absolute',
    top: 20,
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 5,
  },
  
  dropdownButtonStyle: {
    width: 200,
    height: 50,
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    flexDirection: 'row',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
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

const TouchButton = styled.TouchableOpacity`background:black;`;

const Submit = styled.View`
  flex: 1;
  height: 50px;
  width: 100%;
  border-radius: 15px;
  margin-right: 20px;
  padding: 10px;
  background: ${colours.red};
  height: 50px;
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
  color: pink;
  font-size: 15px;
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

  // useEffect(() => {
  //   // Fetch current location when component mounts
  //   getCurrentLocation();
  // }, []);

  // const getCurrentLocation = () => {
  //   // Fetch current GPS location here
  //   // For simplicity, let's assume getCurrentLocation function updates `currentLocation` state
  //   // with the current GPS location
  //   // You can use Geolocation API or any other method to fetch current location
  //   // For example:
  //   navigator.geolocation.getCurrentPosition(
  //     position => {
  //       const { latitude, longitude } = position.coords;
  //       setCurrentLocation({ latitude, longitude });
  //     },
  //     error => console.log(error.message),
  //     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  //   );
  // };

  // const handleDiscard = () => {
  //   // Discard the distance and clear markers
  //   setMarkers([]);
  //   setDistance(null);
  //   setShowButtons(false);
  // };

   {/* <SelectDropdown
    data={Object.keys(clubDistances)}
    onSelect={(selectedItem, index) => {
      console.log(selectedItem, index);
    }}
    renderButton={(selectedItem, isOpened) => {
      return (
        <View style={styles.dropdownButtonStyle}>
          {selectedItem && (
            <Icon name={selectedItem.icon} style={styles.dropdownButtonIconStyle} />
          )}
          <Text style={styles.dropdownButtonTxtStyle}>
            {(selectedItem && selectedItem.title) || 'Select Club'}
          </Text>
          <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
        </View>
      );
    }}
    renderItem={(item, index, isSelected) => {
      return (
        <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
          <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
        </View>
      );
    }}
    showsVerticalScrollIndicator={false}
    dropdownStyle={styles.dropdownMenuStyle}
  /> */}