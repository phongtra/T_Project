import * as React from 'react';
import * as SMS from 'expo-sms';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import * as SecureStore from 'expo-secure-store';
import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';
import * as Expo from 'expo';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import Axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

async function getToken() {
  // Remote notifications do not work in simulators, only on device
  if (!Constants.isDevice) {
    return;
  }
  let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (status !== 'granted') {
    return;
  }
  let value = await Expo.Notifications.getExpoPushTokenAsync();
  console.log('Our token', value);
  /// Send this to a server
}

export default function Home() {
  const [username, setUsername] = React.useState('');
  const [location, setLocation] = React.useState<LocationObject>();
  const [errorMsg, setErrorMsg] = React.useState<string>('');
  const [clicked, setClicked] = React.useState(false);

  const onSOSPress = async () => {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      console.log('Sending');
      SMS.sendSMSAsync(
        ['+358465440916'],
        `My location is : (${location?.coords.latitude}, ${location?.coords.longitude})\nPlease send help!!!!!!`
      );
    }
  };
  let listener: any;
  // React.useEffect(() => {
  //   setTimeout(() => setClicked(false), 2000);
  // }, [clicked]);
  React.useEffect(() => {
    getToken();
    listener = Expo.Notifications.addListener(handleNotification);
    return () => {
      listener && listener.remove();
    };
  });
  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  React.useEffect(() => {
    const setUser = async () => {
      const user = await SecureStore.getItemAsync('user');
      if (user) setUsername(JSON.parse(user).username);
    };
    setUser();
  });
  const handleNotification = ({ origin, data }: { origin: any; data: any }) => {
    console.log(
      `Push notification ${origin} with data: ${JSON.stringify(data)}`
    );
    // let count = 0;
    // while (count < 15 && !clicked) {
    //   setTimeout(() => count++, 1000);
    // }
    // if (count === 15 && !clicked) {
    //   Axios.post('http://192.168.8.105:5000/sendhelp', {
    //     latitude: location?.coords.latitude,
    //     longitude: location?.coords.longitude
    //   }).then(console.log);
    // }
  };
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: 'black',
          fontWeight: 'bold',
          fontSize: 60,
          marginTop: 210,
          marginBottom: 40
        }}
      >
        {clicked ? "You're OK" : 'Daily Check-in'}
      </Text>
      <View
        style={{
          borderWidth: 4,
          borderColor: clicked ? 'rgb(183,181,95)' : '#9e5da3',
          justifyContent: 'center',
          alignContent: 'center',
          width: 309,
          height: 309,
          backgroundColor: '#f4f2f4',
          borderRadius: 201,
          marginTop: 20,
          marginBottom: 70
        }}
      >
        <TouchableOpacity
          onPress={() => setClicked(true)}
          style={{
            ...styles.button,
            backgroundColor: clicked ? 'rgb(163,175,101)' : '#897c98',
            borderColor: clicked ? 'rgb(183,181,95)' : '#9e5da3'
          }}
        >
          <Text style={styles.text}>
            {clicked ? (
              <Ionicons size={180} name='md-checkmark' color='white' />
            ) : (
              'Tap\nHere'
            )}
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          backgroundColor: 'rgb(143,169,133)',
          height: 350,
          width: '100%'
        }}
      >
        {location && (
          <View style={{ backgroundColor: 'rgb(143,169,133)', marginTop: 20 }}>
            <TouchableOpacity
              style={{
                marginLeft: 40,
                marginRight: 40,
                backgroundColor: 'rgb(187,81,81)',
                borderColor: 'rgb(158,93,163)',
                borderTopLeftRadius: 100,
                borderBottomLeftRadius: 100,
                borderTopRightRadius: 100,
                borderBottomRightRadius: 100,
                padding: 30,
                marginTop: 7,
                marginBottom: 30
              }}
              onPress={onSOSPress}
            >
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontSize: 30,
                  fontWeight: 'bold'
                }}
              >
                Tap for Help
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <Text style={{ textAlign: 'center', fontSize: 20 }}>
          Send your location to medical center
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    backgroundColor: '#f4f2f4',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    borderWidth: 4,

    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 300,
    borderRadius: 200
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
});
