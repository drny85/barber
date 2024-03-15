import { View, Text } from 'react-native';
import React from 'react';
import Screen from '~/components/Screen';
import { Link } from 'expo-router';

const Home = () => {
  return (
    <Screen>
      <View className="flex-1 justify-center items-center">
        <Link href={'/barber'}>
          <Text className="text-2xl font-bold">Go To</Text>
        </Link>
      </View>
    </Screen>
  );
};

export default Home;
