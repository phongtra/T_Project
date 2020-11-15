import * as React from 'react';
import { StyleSheet, Image } from 'react-native';

import { View } from '../components/Themed';

export default function Settings() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: 'https://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png'
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  tinyLogo: {
    width: 200,
    height: 200
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%'
  }
});
