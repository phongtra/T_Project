import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { BottomTabParamList, HomeParamList, AddInfoParamList } from '../types';
import Home from '../screens/Home';
import AddInfo from '../screens/AddInfo';
import Settings from '../screens/Settings';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName='Home'
      tabBarOptions={{
        activeTintColor: 'purple',
        tabStyle: { backgroundColor: '#f4f2f4' }
      }}
    >
      <BottomTab.Screen
        name='Home'
        component={Home}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name='md-home' color={color} />
        }}
      />
      <BottomTab.Screen
        name='Add Info'
        component={AddInfo}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name='md-add' color={color} />
        }}
      />
      <BottomTab.Screen
        name='Settings'
        component={Settings}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='md-settings' color={color} />
          )
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<HomeParamList>();

const TabTwoStack = createStackNavigator<AddInfoParamList>();
