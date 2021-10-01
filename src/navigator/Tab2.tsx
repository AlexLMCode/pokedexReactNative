import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {PokemonScreen} from '../screens/PokemonScreen';
import SearchScreen from '../screens/SearchScreen';
import {RootStackParams} from './StackNavigator';

const Tab2 = createStackNavigator<RootStackParams>();

const Tab2Component = () => {
  return (
    <Tab2.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab2.Screen name="HomeScreen" component={SearchScreen} />
      <Tab2.Screen name="PokemonScreen" component={PokemonScreen} />
    </Tab2.Navigator>
  );
};

export default Tab2Component;
