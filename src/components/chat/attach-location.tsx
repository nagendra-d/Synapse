import React, { useState } from 'react';
import { Icon } from 'react-native-elements';
import { BoxElement } from './chat-styled';
import { locationService } from '../../services';
import { ActivityIndicator } from 'react-native';
import { Location } from '../../types/user';

const AttachLocation: React.FunctionComponent<AttachLocationProps> = ({
  onLocationSelect,
}) => {
  const [loader, setLoader] = useState(false);

  const getUserLocation = async () => {
    setLoader(true);
    try {
      const location = await locationService.getLocation();
      setLoader(false);
      onLocationSelect(location);
    } catch (e) {
      setLoader(false);
      throw new Error(e.message);
    }
  };

  return (
    <BoxElement onPress={getUserLocation} disabled={loader}>
      {(!loader && (
        <Icon name='map-pin' type='feather' size={26} color={'#F6921E'} />
      )) || <ActivityIndicator size={26} color={'#F6921E'} />}
    </BoxElement>
  );
};

type AttachLocationProps = {
  onLocationSelect: (location: Location) => void;
};

export default AttachLocation;
