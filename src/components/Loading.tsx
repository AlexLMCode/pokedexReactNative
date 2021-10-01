import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';

export default function Loading() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <ActivityIndicator size={50} color="gray" />
      <Text>Cargando...</Text>
    </View>
  );
}
