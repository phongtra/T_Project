import * as React from 'react';
import { StyleSheet } from 'react-native';
import { AwesomeTextInput } from 'react-native-awesome-text-input';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function AddInfo() {
  return (
    <View style={styles.container}>
      <AwesomeTextInput
        label='Social Number'
        customStyles={{
          container: {
            marginBottom: 10
          },
          title: {
            backgroundColor: 'white'
          }
        }}
      />
      <AwesomeTextInput
        label='Password'
        customStyles={{
          container: {
            marginBottom: 10
          },
          title: {
            backgroundColor: 'white'
          }
        }}
      />
      <AwesomeTextInput
        label='Doctor Id'
        customStyles={{
          title: {
            backgroundColor: 'white'
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%'
  }
});
