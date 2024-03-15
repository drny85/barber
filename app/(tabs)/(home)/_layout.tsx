import React from 'react';
import { Stack } from 'expo-router';

const HomeLaylout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="barber" options={{ presentation: 'modal' }} />
    </Stack>
  );
};

export default HomeLaylout;
