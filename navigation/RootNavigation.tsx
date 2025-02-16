import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TabNavigator } from './TabNavigation';
import { Section } from '@/components/Section';

const Stack = createStackNavigator();

export const RootStackNavigator = () => {
  return (
    // <NavigationContainer in>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="TabsStack" component={TabNavigator} />
        <Stack.Screen name="Section" component={Section} />
      </Stack.Navigator>
    // </NavigationContainer>
  );
}
