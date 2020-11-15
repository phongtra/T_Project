import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: 'one'
            }
          },
          'Add Info': {
            screens: {
              AddInfoScreen: 'two'
            }
          },
          Settings: {
            screens: {
              SettingsScreen: 'three'
            }
          }
        }
      },
      NotFound: '*'
    }
  }
};
