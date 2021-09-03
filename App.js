/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppNavigation from './src/navigation/AppNavigation'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default app = ()=>(
  <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'stretch'}}>
    <NavigationContainer>
      <AppNavigation/>
    </NavigationContainer>
  </View>
)




