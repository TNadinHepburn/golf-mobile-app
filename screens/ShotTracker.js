import { StyleSheet, Text, View, Button  } from 'react-native';
import { useState, useEffect  } from 'react';
import { clubFromID } from '../components/ClubFromID';
import { calculateDistance } from '../components/CalculateDistance';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';
import colours from '../components/Colours';

export default function ShotTracker() {
  const [timestamp, setTimestamp] = useState(0)
  const [watchID, setWatchID] = useState(false);
  const [trackingData, setTrackingData] = useState([]);
  const [clubUsed, setClubUsed] = useState('7I');
  const [currentLocation, setCurrentLocation] = useState(null);
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

  const geolocationPositionOpts = {useSignificantChanges: true}

  const startTracking = () => {
    setTimestamp(new Date())
    //TODO 2: Get watch id from navigator.geolocation.watchPosition and set this using setWatchID
    setWatchID(navigator.geolocation.watchPosition(onGeolocation, onGeolocationError));
  };

  const stopTracking = () => {
    
    navigator.geolocation.clearWatch(watchID);
    // Store the new route
    storeRoute();

    //Reset state
    setWatchID(false);
    setTimestamp(0);
    setTrackingData([]);

  };

  const storeRoute = async () => {
    try {
      const value = await AsyncStorage.getItem('routes'); 
      if (value !== null) {
        data = JSON.parse(value);
        // Append new route to routes
        Object.assign(data, { [text]: trackingData });
        // TODO 6: Store new routes value in routes
        await AsyncStorage.setItem('routes', JSON.stringify(data));
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
    setTrackingData(trackingData);  
  };

  
const fitAllMarkers = (coords) => {
  googlemap.fitToCoordinates(coords), {
    edgePadding: DEFAULT_PADDING,
    animated: true
  }
}


  const clubDistances = {
    "1W": [],
    "3W": [],
    "5W": [],
    "7W": [],
    "9W": [],
    "1I": [],
    "2I": [],
    "3I": [],
    "4I": [],
    "5I": [],
    "6I": [],
    "7I": [],
    "8I": [],
    "9I": [],
    "48": [],
    "52": [],
    "54": [],
    "56": [],
    "58": [],
    "60": [],
  };

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
              {/* TODO 4: Call startTracking when pressed */}
              <TouchButton onPress={startTracking}>
                <BtnText>Track</BtnText>
              </TouchButton>
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
  background: ${colours.background};
`;
const Holder = styled.View`
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
  background: ${colours.background};
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
  color: white;
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