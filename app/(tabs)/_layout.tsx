import { Tabs } from 'expo-router';
import React, { useEffect } from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import useAuthentication from '@/hooks/useAuthentication';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const {} = useAuthentication();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[ 'light'].tint,
        headerShown: true,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home', 
          headerShown:false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color}  />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="bmi"
        options={{
          title: 'BMI',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'medkit' : 'medkit-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="meals"
        options={{
          title: 'Meals',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'pizza' : 'pizza-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
    
  );
}
