import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useThemes } from '@/providers/Themes/ThemeProvider';
import { Home } from '@/components/Home';
import { Webview } from '@/components/Webview';
import { IconSymbol } from '@/controls/Icons/IconSymbol';
import { Searches } from '@/components/Searches';
import { Seats } from '@/components/Seats';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  const { colors } = useThemes();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.tabActive,
        tabBarInactiveTintColor: colors.tabInactive,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color}/>,
        }}/>
      <Tab.Screen
        name="Web"
        component={Webview}
        options={{
          title: 'Web',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="network" color={color}/>,
        }}/>
      <Tab.Screen
        name="Searches"
        component={Searches}
        options={{
          title: 'Searches',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="magnifyingglass" color={color}/>,
        }}/>
      <Tab.Screen
        name="Seats"
        component={Seats}
        options={{
          title: 'Seats',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="carseat.right.fill" color={color}/>,
        }}/>
    </Tab.Navigator>
  );
}
