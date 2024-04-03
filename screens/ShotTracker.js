import { StyleSheet, Text, View, Button  } from 'react-native';
import { useState, useEffect  } from 'react';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ShotTracker() {
  const [markers, setMarkers] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [distance, setDistance] = useState(null);

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

  const handleDiscard = () => {
    // Discard the distance and clear markers
    setMarkers([]);
    setDistance(null);
    setShowButtons(false);
  };

  const handleSave = () => {
    // Handle saving the distance, you can implement your saving logic here
    // For example, you can send the distance to a backend server
    console.log('Distance saved:', distance);
    // Clear markers and hide buttons
    setMarkers([]);
    setDistance(null);
    setShowButtons(false);
  };


  const handleMarkerPress = () => {
    // Add current location as a marker
    setMarkers([...markers, currentLocation]);
  };
return (
  <View style={styles.container}>
  <MapView
    style={styles.map}
    initialRegion={{
      latitude: currentLocation ? currentLocation.latitude : 53.229850,
      longitude: currentLocation ? currentLocation.longitude : -0.553690,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
    provider={PROVIDER_GOOGLE}
    ref={(ref) => {googlemap = ref;}}
  />
   <SelectDropdown
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
  />
  <View style={styles.buttonContainer}>
    <Button title="Start Tracking" onPress={handleMarkerPress} />
  </View>
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
    color: '#151E26',
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
    color: '#151E26',
  },
});