import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import StartScreen from './screens/StartUpScreen';
import { AuthenticationPages } from './navigation';
import EStyleSheet from 'react-native-extended-stylesheet';

export default function App() {
  //Estylesheet build command is required for use of estylesheet throughout the application
  EStyleSheet.build();
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
