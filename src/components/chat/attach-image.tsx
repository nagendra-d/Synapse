import React, { useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { BoxElement } from './chat-styled';
import { imageService } from '../../services';
import * as ImagePicker from 'expo-image-picker';
import { TouchableRipple } from 'react-native-paper';
import styled from 'styled-components/native';
import { ModalContainer } from '../shared/modal-container/modal-container';
import Modal from 'react-native-modal';

const AttachImage: React.FunctionComponent<AttachImageProps> = ({
  onImageSelected,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loader, setLoader] = useState(false);

  const callSelector = async (
    fn: () => Promise<ImagePicker.ImagePickerResult>,
  ) => {
    const image = await fn();
    if (!image || image.cancelled) {
      return;
    }
    onDismiss();
    onImageSelected();
  };

  const openSelector = () => {
    setIsOpen(true);
    setLoader(true);
  };

  const onDismiss = () => {
    setIsOpen(false);
    setLoader(false);
  };

  const fromCamera = () => {
    callSelector(() => imageService.getImageFromCamera());
  };

  const fromLibrary = () => {
    callSelector(() => imageService.getImageFromGallery());
  };

  return (
    <View>
      <BoxElement
        onPress={openSelector}
        accessibilityComponentType={'button'}
        disabled={loader}
      >
        {(!loader && (
          <Icon name='camera' type='feather' size={26} color={'#F6921E'} />
        )) || <ActivityIndicator size={26} color={'#F6921E'} />}
      </BoxElement>
      <Modal
        isVisible={isOpen}
        onDismiss={onDismiss}
        onBackButtonPress={onDismiss}
        onBackdropPress={onDismiss}
        backdropOpacity={0.3}
        hideModalContentWhileAnimating={true}
        useNativeDriver={true}
      >
        <LocalModalContainer>
          <Header>Choose an option below</Header>
          <Option onPress={fromCamera}>
            <Text>Camera</Text>
          </Option>
          <Option onPress={fromLibrary}>
            <Text>Photo Library</Text>
          </Option>
        </LocalModalContainer>
      </Modal>
    </View>
  );
};

type AttachImageProps = {
  onImageSelected: () => void;
};

export default AttachImage;

const LocalModalContainer = styled(ModalContainer as any)`
  flex-direction: column;
  margin: 20px;
  padding: 10px 0;
`;

const MENU_HIGHLIGHT_COLOR = 'rgba(0, 0, 0, .32)';

const Option = styled<React.SFC<any>>((props) => (
  <TouchableRipple
    {...props}
    rippleColor={MENU_HIGHLIGHT_COLOR}
    underlayColor={MENU_HIGHLIGHT_COLOR}
  />
))`
  padding: 10px 20px;
`;

const Header = styled.Text`
  font-size: 16px;
  font-weight: 700;
  padding: 10px 20px;
`;
