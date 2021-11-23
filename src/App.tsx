import React from 'react';
import { Portal } from 'react-native-paper';
import { store, storeState } from './state';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Navigation from './navigation/navigation';
import styled from 'styled-components/native';
import FullScreenIndicator from './components/shared/full-screen-indicator/full-screen-indicator';
import {
  useFonts,
  Roboto_500Medium,
  Roboto_400Regular,
} from '@expo-google-fonts/roboto';

export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_500Medium,
    Roboto_400Regular,
  });

  if (!fontsLoaded) {
    return <FullScreenIndicator />;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={<FullScreenIndicator />} persistor={storeState}>
        <Portal.Host>
          <ScreenContainer>
            <Navigation />
          </ScreenContainer>
        </Portal.Host>
      </PersistGate>
    </Provider>
  );
}

const ScreenContainer = styled.View`
  flex: 1;
  background-color: #fff;
  display: flex;
`;
