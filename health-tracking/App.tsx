import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text, View } from './components/Themed';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { StyleSheet } from 'react-native';
import { AwesomeTextInput } from 'react-native-awesome-text-input';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import * as Location from 'expo-location';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [location, setLocation] = React.useState<Location.LocationObject>();
  const [errorMsg, setErrorMsg] = React.useState<string>('');
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  let listener: any;

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

  useEffect(() => {
    const checkLogin = async () => {
      await SecureStore.deleteItemAsync('secure_token');
      const token = await SecureStore.getItemAsync('secure_token');
      if (token) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    };
    checkLogin();
  }, [setLoggedIn]);

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://192.168.8.105:5000/signin', {
        username,
        password,
        doctorId
      });
      await SecureStore.setItemAsync('secure_token', res.data.token);
      await SecureStore.setItemAsync('user', JSON.stringify(res.data.user));
      const token = await SecureStore.getItemAsync('secure_token');
      console.log('token', token);
      setLoggedIn(true);
    } catch (e) {
      console.log(e);
    }
  };

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <>
        <View
          style={{
            width: '100%',
            height: 80,
            backgroundColor: 'rgb(196,227,195)'
          }}
        />
        {!loggedIn ? (
          <View style={styles.container}>
            <Text darkColor='#f0f' style={{ fontSize: 40, fontWeight: 'bold' }}>
              Welcome to HT
            </Text>
            <AwesomeTextInput
              label='Social Number'
              value={username}
              onChange={(e) => setUsername(e.nativeEvent.text)}
              customStyles={{
                container: {
                  borderWidth: 1,
                  borderColor: 'grey',
                  borderRadius: 10,
                  marginBottom: 10
                },
                title: {
                  backgroundColor: 'white'
                }
              }}
            />
            <AwesomeTextInput
              label='Password'
              onChange={(e) => setPassword(e.nativeEvent.text)}
              secureTextEntry={true}
              customStyles={{
                container: {
                  borderWidth: 1,
                  borderColor: 'grey',
                  borderRadius: 10,
                  marginBottom: 10
                },
                title: {
                  backgroundColor: 'white'
                }
              }}
            />
            <AwesomeTextInput
              label='Doctor Id'
              onChange={(e) => setDoctorId(e.nativeEvent.text)}
              customStyles={{
                container: {
                  borderWidth: 1,
                  borderColor: 'grey',
                  borderRadius: 10
                },
                title: {
                  backgroundColor: 'white'
                }
              }}
            />
            <TouchableOpacity
              onPress={handleSubmit}
              style={{ backgroundColor: 'red', padding: 30, marginTop: 10 }}
            >
              <Text style={{ fontSize: 30, color: 'black' }}>Log in</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </SafeAreaProvider>
        )}
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
